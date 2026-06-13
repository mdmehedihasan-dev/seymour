$ErrorActionPreference = "Stop"
$srcDir = "C:\Users\Mehedi\Desktop\Seymour\src"

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

Replace-TextInFiles -find "DaycareDaycareren" -replace "DaycareChildren"
Replace-TextInFiles -find "Daycareren" -replace "Children"

Write-Host "Renaming files..."
Get-ChildItem -Path $srcDir -Recurse -Filter "*Daycareren*" | ForEach-Object {
    $newName = $_.Name -replace "DaycareDaycareren", "DaycareChildren" -replace "Daycareren", "Children"
    Rename-Item -Path $_.FullName -NewName $newName
    Write-Host "  Renamed $($_.Name) to $newName"
}

Write-Host "Done!"
