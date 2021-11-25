import React from "react";
export const dropdown_populate = (items,type) => {
    let cat = new Set();
    items.forEach(element => {
        cat.add(element[type].trim())
    });
    let cat_array = [...cat];
    const options = cat_array.map((element,idx) => {
        return <option value={element} key={idx}>{element}</option>
    })
    return options
}