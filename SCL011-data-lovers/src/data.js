window.app = {
    changeOrder,
    filterEggsByKm,
    notInEggs
};

function changeOrder(data, orderBy) {
    if (orderBy === "num") {
        return data.sort(function(a, b) {
            return a.num.localeCompare(b.num);
        });
    } else if (orderBy === "num2") {
        return data.sort(function(a, b) {
            return b.num.localeCompare(a.num);
        });
    } else if (orderBy === "AZ") {
        return data.sort(function(a, b) {
            return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
        });
    } else {
        return data.sort(function(a, b) {
            return b.name.localeCompare(a.name, "en", { sensitivity: "base" });
        });
    }
}

function filterEggsByKm(data, kmValue) {
    return data.filter(item => item.egg.includes(kmValue));
}

function notInEggs(data) {
    return data.reduce((acc, curr) => acc + (curr.egg == "Not in Eggs" ? 1 : 0), 0);
};