
window.onload = function()
{
    document.getElementById('go').onclick = ()=>go();
};

function go()
{
    const firstword = document.getElementById('firstword').value;
    const secondword = document.getElementById('secondword').value;

    const lev = levenshteinCreate(firstword, secondword);

    levenshteinCalculate(lev);

    levenshteinPrintGrid(lev);

    levenshteinPrintCost(lev);
}
