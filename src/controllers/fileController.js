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

export const getSell = (req, res) => {
    return res.render('sell', {pageTitle:"자료 등록 | 캠퍼스하우 클론"});
};

export const postSell = (req, res) => {
    console.log(req.body)
    return res.end();
};