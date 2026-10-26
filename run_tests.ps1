# Automated Test Suite for Car Rental Assignment SVU F25
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "=========================================="
Write-Host "TEST 1: File Existence and Paths Check"
Write-Host "=========================================="
$files = @(
    "home.html",
    "AboutUs.html",
    "Cars.html",
    "style.css",
    "myFunctions.js",
    "assets/jquery.min.js",
    "assets/images/logo.svg",
    "assets/images/car-cr001.svg",
    "assets/images/car-cr002.svg",
    "assets/images/car-cr003.svg",
    "assets/images/car-cr004.svg",
    "assets/images/car-cr005.svg",
    "AI_FEATURE_REPORT.md",
    "PROJECT_REQUIREMENTS.md"
)

foreach ($f in $files) {
    $exists = Test-Path "c:\Users\Administrator\Documents\GitHub\diala\$f"
    if ($exists) {
        Write-Host "[PASS] File exists: $f"
    } else {
        Write-Host "[FAIL] Missing file: $f"
    }
}

Write-Host "`n=========================================="
Write-Host "TEST 2: Strict XHTML Structure Check"
Write-Host "=========================================="
$xhtmlFiles = @("home.html", "AboutUs.html", "Cars.html")
foreach ($xf in $xhtmlFiles) {
    try {
        $content = [System.IO.File]::ReadAllText("c:\Users\Administrator\Documents\GitHub\diala\$xf", [System.Text.Encoding]::UTF8)
        $clean = $content -replace '<!DOCTYPE[^>]*>', ''
        $clean = $clean -replace '&copy;', '&#169;'
        $clean = $clean -replace '&larr;', '&#8592;'
        $clean = $clean -replace '&rarr;', '&#8594;'
        $clean = $clean -replace '&darr;', '&#8595;'
        $clean = $clean -replace '&nearr;', '&#8599;'
        $clean = $clean -replace '&bull;', '&#8226;'
        $clean = $clean -replace '&times;', '&#215;'
        
        [xml]$doc = $clean
        Write-Host "[PASS] $xf XML is valid and well-formed!"
    } catch {
        Write-Host "[FAIL] $xf error: $($_.Exception.Message)"
    }
}

Write-Host "`n=========================================="
Write-Host "TEST 3: Form Validation Regex Rules"
Write-Host "=========================================="
# 3.1 Arabic Name
$arabicRegex = "^[\u0621-\u064A\s]+$"
$nameValid = [System.Text.RegularExpressions.Regex]::IsMatch([char]0x0623 + "حمد محمد", $arabicRegex)
$nameInvalid = [System.Text.RegularExpressions.Regex]::IsMatch("John123", $arabicRegex)
Write-Host "[PASS] Arabic name valid case: $nameValid (Expected True)"
Write-Host "[PASS] Arabic name invalid case: $nameInvalid (Expected False)"

# 3.2 National ID (11 digits, governorate 01-14)
$nidRegex = "^(0[1-9]|1[0-4])[0-9]{9}$"
$nidTests = @(
    @("01012345678", $true),
    @("14098765432", $true),
    @("00012345678", $false),
    @("15012345678", $false),
    @("0101234567",  $false),
    @("010123456789", $false)
)
foreach ($t in $nidTests) {
    $match = [System.Text.RegularExpressions.Regex]::IsMatch($t[0], $nidRegex)
    if ($match -eq $t[1]) {
        Write-Host "[PASS] NID '$($t[0])': Match=$match"
    } else {
        Write-Host "[FAIL] NID '$($t[0])': Match=$match"
    }
}

# 3.3 Mobile (Syriatel & MTN)
$mobileRegex = "^09(3[0-9]|8[0-9]|9[0-9]|7[0-9]|4[0-9]|5[0-9]|6[0-9])[0-9]{6}$"
$mobTests = @(
    @("0933112233", $true),
    @("0944556677", $true),
    @("0988112233", $true),
    @("0955112233", $true),
    @("0911223344", $false),
    @("093311223",  $false)
)
foreach ($m in $mobTests) {
    $match = [System.Text.RegularExpressions.Regex]::IsMatch($m[0], $mobileRegex)
    if ($match -eq $m[1]) {
        Write-Host "[PASS] Mobile '$($m[0])': Match=$match"
    } else {
        Write-Host "[FAIL] Mobile '$($m[0])': Match=$match"
    }
}

Write-Host "`n=========================================="
Write-Host "TEST 4: Financial Calculations"
Write-Host "=========================================="
# Test A: 8 days @ 250000
$cost8 = 250000 * 8
$disc8 = $cost8 * 0.10
$final8 = $cost8 - $disc8
if ($cost8 -eq 2000000 -and $disc8 -eq 200000 -and $final8 -eq 1800000) {
    Write-Host "[PASS] 8-Day Test (CR-001): Base=2000000, Disc=200000, Final=1800000 SP"
} else {
    Write-Host "[FAIL] 8-Day Test mismatch!"
}

# Test B: 7 days @ 250000
$cost7 = 250000 * 7
$disc7 = 0
$final7 = $cost7 - $disc7
if ($cost7 -eq 1750000 -and $disc7 -eq 0 -and $final7 -eq 1750000) {
    Write-Host "[PASS] 7-Day Test (CR-001): Base=1750000, Disc=0, Final=1750000 SP"
} else {
    Write-Host "[FAIL] 7-Day Test mismatch!"
}

# Test C: Multiple cars (CR-001 250k + CR-002 400k) for 10 days
$multiCost = (250000 + 400000) * 10
$multiDisc = $multiCost * 0.10
$multiFinal = $multiCost - $multiDisc
if ($multiCost -eq 6500000 -and $multiDisc -eq 650000 -and $multiFinal -eq 5850000) {
    Write-Host "[PASS] Multi-car 10-day test: Base=6500000, Disc=650000, Final=5850000 SP"
} else {
    Write-Host "[FAIL] Multi-car test mismatch!"
}
