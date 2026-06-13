$ErrorActionPreference = "Stop"

$srcDir = "C:\Users\Mehedi\Desktop\Seymour\src"

# Function to replace text in files
function Replace-TextInFiles {
    param (
        [string]$find,
        [string]$replace
    )
    Write-Host "Replacing '$find' with '$replace'..."
    Get-ChildItem -Path $srcDir -Recurse -Include *.jsx,*.js,*.css | ForEach-Object {
        $content = Get-Content $_.FullName -Raw
        if ($content -match [regex]::Escape($find)) {
            $newContent = $content -replace [regex]::Escape($find), $replace
            Set-Content -Path $_.FullName -Value $newContent -NoNewline
            Write-Host "  Updated $($_.Name)"
        }
    }
}

# 1. Replace Component and file references
$components = @(
    "ChildDashboard",
    "ChildSettings",
    "ChildUserManagement",
    "ChildReports",
    "ChildObservations",
    "ChildChildren",
    "ChildAIMonitoring",
    "ChildSidebar",
    "ChildHeader"
)

foreach ($comp in $components) {
    $newComp = $comp -replace "Child", "Daycare"
    Replace-TextInFiles -find $comp -replace $newComp
}

# 2. Replace role strings
Replace-TextInFiles -find "'child'" -replace "'daycare'"
Replace-TextInFiles -find '"child"' -replace '"daycare"'
Replace-TextInFiles -find 'role: "child"' -replace 'role: "daycare"'
Replace-TextInFiles -find "role: 'child'" -replace "role: 'daycare'"

# 3. Replace common label strings
Replace-TextInFiles -find '"Child Dashboard"' -replace '"Daycare Dashboard"'
Replace-TextInFiles -find '"Child Profiles"' -replace '"Daycare Profiles"'
Replace-TextInFiles -find 'KIDPORT CHILD' -replace 'KIDPORT DAYCARE'
Replace-TextInFiles -find '>Child<' -replace '>Daycare<'

# 4. Rename Files
Write-Host "Renaming files..."
Get-ChildItem -Path $srcDir -Recurse -Filter "Child*.jsx" | ForEach-Object {
    $newName = $_.Name -replace "Child", "Daycare"
    Rename-Item -Path $_.FullName -NewName $newName
    Write-Host "  Renamed $($_.Name) to $newName"
}

Write-Host "Done!"
