const files = [
    {
        name: "file1",
        number : 1
    },
    {
        name: "file2",
        number: 2
    },
    {
        name: "file3",
        number: 3
    }
];

export const handleHome = (req, res) => {
    return res.render("home", {pageTitle : "선배의 노하우를 내려받다, 캠퍼스하우 클론", files});
};