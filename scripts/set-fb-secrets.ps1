# Saves the AyudaWatch Facebook Page ID and Page token as GitHub Actions secrets.
# You paste your long-lived USER token (from the Access Token Debugger, after
# "Extend Access Token"); the script looks up the AyudaWatch Page with it and
# stores FB_PAGE_ID and FB_PAGE_TOKEN in iamjmlim/ayudawatch. Nothing is printed.
#
# Run:  powershell -ExecutionPolicy Bypass -File scripts\set-fb-secrets.ps1

$ErrorActionPreference = 'Stop'
$repo = 'iamjmlim/ayudawatch'
$pageName = 'AyudaWatch'
$gh = 'C:\Program Files\GitHub CLI\gh.exe'

$secure = Read-Host -AsSecureString 'Paste your long-lived user token (hidden) and press Enter'
$userToken = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
  [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secure))
if (-not $userToken) { throw 'No token entered.' }

$accounts = Invoke-RestMethod -Uri 'https://graph.facebook.com/v21.0/me/accounts?fields=id,name,access_token&limit=100' `
  -Headers @{ Authorization = "Bearer $userToken" }
$page = $accounts.data | Where-Object { $_.name -eq $pageName } | Select-Object -First 1
if (-not $page) {
  $names = ($accounts.data | ForEach-Object { $_.name }) -join ', '
  throw "Page '$pageName' not found for this token. Pages found: $names. Generate the token again and allow AyudaWatch."
}

# Check the Page token works before saving it.
$debug = Invoke-RestMethod -Uri "https://graph.facebook.com/v21.0/me?fields=id,name" -Headers @{ Authorization = "Bearer $($page.access_token)" }

$page.id | & $gh secret set FB_PAGE_ID -R $repo
if ($LASTEXITCODE -ne 0) { throw 'Could not save FB_PAGE_ID. Run "gh auth login" first, then run this script again.' }
$page.access_token | & $gh secret set FB_PAGE_TOKEN -R $repo
if ($LASTEXITCODE -ne 0) { throw 'Could not save FB_PAGE_TOKEN. Run "gh auth login" first, then run this script again.' }

Write-Host "Saved FB_PAGE_ID and FB_PAGE_TOKEN for '$($debug.name)' (Page ID $($page.id)) in $repo." -ForegroundColor Green
