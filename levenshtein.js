
function levenshteinCreate(source_word, target_word)
{
    let lev = {};

    lev.grid = [];
    lev.source_length = source_word.length;
    lev.target_length = target_word.length;
    lev.minimum_cost = 0;
    lev.source_word = source_word;
    lev.target_word = target_word;

    for(let r = 0; r <= lev.source_length; r++)
    {
        lev.grid[r] = [];

        for(let c = 0; c <= lev.target_length; c++)
        {
            if(r == 0)
            {
                lev.grid[r][c] = c;
            }
            else if(c == 0)
            {
                lev.grid[r][c] = r;
            }
            else
            {
                lev.grid[r][c] = 0;
            }
        }
    }

    return lev;
}


function levenshteinCalculate(lev)
{
    const INSERT_COST = 1;
    const DELETE_COST = 1;
    const SUBSTITUTE_COST = 1;

    let total_substitution_cost;
    let total_deletion_cost;
    let total_insertion_cost;

    for(let sourceletter = 0; sourceletter < lev.source_length; sourceletter++)
    {
        for(let targetletter = 0; targetletter < lev.target_length; targetletter++)
        {
            if(lev.target_word[targetletter] != lev.source_word[sourceletter])
            {
                total_substitution_cost = lev.grid[sourceletter][targetletter] + SUBSTITUTE_COST;
            }
            else
            {
                total_substitution_cost = lev.grid[sourceletter][targetletter];
            }

            total_deletion_cost = lev.grid[sourceletter][targetletter+1] + DELETE_COST;
            total_insertion_cost = lev.grid[sourceletter+1][targetletter] + INSERT_COST;

            lev.grid[sourceletter+1][targetletter+1] = min(total_substitution_cost, total_deletion_cost, total_insertion_cost);
        }
    }
}


function min(a, b, c)
{
    let m;

    (a <= b && a <= c) ? (m = a) : (b <= a && b <= c) ? (m = b) : (m = c);

    return m;
}


function levenshteinPrintGrid(lev)
{
    clearConsole("console");

    for(let c = 0; c <= lev.target_length; c++)
    {
        if(c > 0)
        {
            writeToConsole(`<span class="letter">${lev.target_word[c-1].padEnd(5, " ").replace(/ /g, "&nbsp;")}</span>`, "console");
        }
        else
        {
            writeToConsole("&nbsp;".repeat(10), "console");
        }
    }

    writeToConsole("<br/><br/>", "console");

    for(let r = 0; r <= lev.source_length; r++)
    {
        if(r > 0)
        {
            writeToConsole(`<span class="letter">${lev.source_word[r-1]}</span>${"&nbsp;".repeat(4)}`, "console");
        }
        else
        {
            writeToConsole("&nbsp;".repeat(5), "console");
        }

        for(let c = 0; c <= lev.target_length; c++)
        {
            writeToConsole(`${String(lev.grid[r][c]).padEnd(5, " ").replace(/ /g, "&nbsp;")}`, "console");
        }

        writeToConsole("<br/><br/>", "console");
    }
}


function levenshteinPrintCost(lev)
{
    writeToConsole(`<span class="letter">Minimum cost of transforming "${lev.source_word}" to "${lev.target_word}" = ${lev.grid[lev.source_length][lev.target_length]}</span>`, "console");
}
