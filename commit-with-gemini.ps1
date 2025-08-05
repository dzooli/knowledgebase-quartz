param()

try {
    $diff = git diff --cached
    if ($diff) {
        Write-Host "Generating commit message with Gemini..."
        
        $prompt = @"
Generate a concise commit message (max 50 chars) based on this git diff output:

$diff

Respond with only the commit message, no explanation, no tool use, do not create any other diff by yourself.
"@
        
        $commitMsg = (gemini --prompt $prompt).Trim()
        
        if ($commitMsg -and $commitMsg -ne '' -and $commitMsg -notlike '*error*' -and $commitMsg -notlike '*I need*' -and $commitMsg -notlike '*diff*') {
            Write-Host "Generated message: $commitMsg"
            git commit -m $commitMsg
        } else {
            Write-Host "Gemini failed or returned invalid message, using fallback"
            git commit -m "Update files"
        }
    } else {
        Write-Host "No staged changes to commit"
    }
} catch {
    Write-Host "Error: $($_.Exception.Message)"
    exit 1
}
