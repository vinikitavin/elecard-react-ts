export function firstCursiveLetter(word: string): string {
    const firstLetterToUpperCase = word.split('')[0].toUpperCase();
    const restPartOfTheWord = word.slice(1);
    return firstLetterToUpperCase + restPartOfTheWord;
}

export function timeConverter(UNIX_timestamp: number): string {
    let a = new Date(UNIX_timestamp);
    let months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    return date + '.' + month + '.' + year;

}
