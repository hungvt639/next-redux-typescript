export const paserDateToString = (date: number | string) => {
    if (typeof date === undefined) return "";
    else {
        if (date === 0) return "";
        // const dates: string = date?.toString()
        const d = new Date(date);
        var dd = String(d.getDate()).padStart(2, "0");
        var mm = String(d.getMonth() + 1).padStart(2, "0");
        var yyyy = d.getFullYear();

        return mm + "/" + dd + "/" + yyyy;
    }
};
