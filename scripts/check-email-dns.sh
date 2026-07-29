#!/usr/bin/env bash
# Verify phonelicense.co mail DNS during the Mailgun → Google Workspace move.
# Run after each change. It checks the records you cannot eyeball safely, and
# tells you when it is safe to re-enforce DMARC.
#
#   ./scripts/check-email-dns.sh
#
# Rollback reference for the original Mailgun setup is in the DNS snapshot taken
# 2026-07-29 (see INPUTS-NEEDED.md).

set -uo pipefail
D=phonelicense.co
pass=0; fail=0; warn=0
ok()   { echo "  ✅ $1"; pass=$((pass+1)); }
bad()  { echo "  ❌ $1"; fail=$((fail+1)); }
note() { echo "  ⚠️  $1"; warn=$((warn+1)); }

echo "── MX ───────────────────────────────────────────"
MX=$(dig +short MX $D)
echo "$MX" | sed 's/^/     /'
# Google has two valid shapes: the modern single `smtp.google.com` and the
# classic 5-record `aspmx.l.google.com` set that Squarespace's preset adds.
if grep -qiE "smtp\.google\.com|aspmx\.l\.google\.com" <<<"$MX"; then ok "Google MX present"
elif grep -qi "mailgun" <<<"$D$MX"; then bad "still pointing at Mailgun — inbound mail is not yours yet"
else note "no recognised MX"; fi
# Only a conflict once Google is actually there — a domain can have one receiver.
if grep -qiE "smtp\.google\.com|aspmx\.l\.google\.com" <<<"$MX" && grep -qi "mailgun" <<<"$MX"; then
  bad "Mailgun AND Google MX both present — delete the Mailgun pair, mail will be split otherwise"
fi

echo "── SPF ──────────────────────────────────────────"
SPF=$(dig +short TXT $D | tr -d '"' | grep -i "^v=spf1" || true)
echo "     ${SPF:-<none>}"
[ -z "$SPF" ] && bad "no SPF record"
[ "$(grep -ci "^v=spf1" <<<"$SPF")" -gt 1 ] && bad "MORE THAN ONE SPF record — this breaks SPF entirely"
grep -qi "_spf.google.com" <<<"$SPF" && ok "Google authorised to send" || { [ -n "$SPF" ] && bad "Google NOT in SPF — your mail will fail"; }
grep -qi "mailgun" <<<"$SPF" && note "Mailgun still authorised (harmless if unused; remove once you're sure)"

echo "── DKIM ─────────────────────────────────────────"
G=$(dig +short TXT google._domainkey.$D | tr -d '"')
if [ -n "$G" ]; then ok "google._domainkey published (${#G} chars)"
else bad "google._domainkey MISSING — generate it in Google Admin → Apps → Gmail → Authenticate email"; fi
M=$(dig +short TXT mx._domainkey.$D | tr -d '"')
[ -n "$M" ] && note "old Mailgun DKIM (mx._domainkey) still published — safe to delete once mail flows"

echo "── DMARC ────────────────────────────────────────"
DM=$(dig +short TXT _dmarc.$D | tr -d '"')
echo "     ${DM:-<none>}"
POL=$(grep -o "p=[a-z]*" <<<"$DM" | head -1 | cut -d= -f2)
case "$POL" in
  none)   note "p=none — correct DURING the move. Restore p=reject once mail is verified." ;;
  reject) if [ -n "$G" ] && grep -qi "_spf.google.com" <<<"$SPF"; then ok "p=reject with Google SPF+DKIM in place"
          else bad "p=reject but Google is NOT fully authorised — your mail is being REJECTED right now. Set p=none until fixed."; fi ;;
  *)      note "policy is '${POL:-unset}'" ;;
esac
grep -q "adkim=s" <<<"$DM" && note "strict DKIM alignment — requires google._domainkey to be live"

echo
echo "────────────────────────────────────────────────"
echo "  $pass passed · $warn warnings · $fail failures"
if [ "$fail" -eq 0 ] && [ "$POL" = "none" ] && [ -n "$G" ] && grep -qi "_spf.google.com" <<<"$SPF"; then
  echo "  → Records look right. Send a test both ways, then set p=reject."
elif [ "$fail" -eq 0 ] && [ "$POL" = "reject" ]; then
  echo "  → Done. Nothing left to do."
else
  echo "  → Fix the ❌ items above before sending anything."
fi
exit $(( fail > 0 ))
