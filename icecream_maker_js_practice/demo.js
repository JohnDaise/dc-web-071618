document.addEventListener("DOMContentLoaded", function() {
    let e, t, n = document.getElementById("iceCreamForm"),
        i = document.getElementById("iceCreamCheckboxes"),
        d = document.getElementById("iceCreamGrid");
//test comment
    function a() {
        l().then(t => {
            e = t, i.innerHTML = r(e)
        }).then(() => fetch("http://localhost:3000/ice_cream").then(e => e.json())).then(n => {
            t = n, d.innerHTML = function(t) {
                return t.map(t => (function(t) {
                    let n = t.ingredients.map(t => {
                        var n = e.find(e => e.id == t);
                        return `<li data-ingredientId=${n.id}>${n.name}</li>`
                    }).join(" ");
                    return `<div data-id="${t.id}">\n              <h3>${t.name}</h3>\n              <img src="icecream.jpeg">\n              <div id="editDeleteButtons">\n                <button data-button-type="edit" class="editButton">Edit</button>\n                <button data-button-type="delete" class="deleteButton">Delete</button>\n              </div>\n              <h4>Ingredients:</h4>\n\n              <ul>\n                ${n}\n              </ul>\n            </div>`
                })(t)).join(" ")
            }(n)
        })
    }

    function l() {
        return fetch("http://localhost:3000/ingredient").then(e => e.json())
    }

    function r(e) {
        return e.map(e => `<li id="li-ing-${e.id}" data-id=${e.id}>\n      <label for="ing-${e.id}" >${e.name}</label>\n      <input id="ing-${e.id}" data-id=${e.id}  type='checkbox'>\n      </li>`).join(" ")
    }

    function c(e) {
        let t = [];
        for (let n = 0; n < e.length; n++) e[n].children[1].checked && t.push(e[n].dataset.id);
        return t
    }
    n.addEventListener("submit", e => {
        ! function(e) {
            e.preventDefault();
            let t = e.target.children[1].value,
                n = c(e.target.children[4].children),
                i = {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: t,
                        ingredients: n
                    })
                };
            fetch("http://localhost:3000/ice_cream", i).then(e => e.json()).then(() => {
                a()
            })
        }(e)
    }), d.addEventListener("click", e => {
        let n = e.target.dataset.buttonType;
        console.log(e), "edit" == n ? function(e) {
            let n = e.target.parentElement.parentElement,
                [i, d, a, c, o] = n.children,
                h = n.dataset.id,
                u = t.find(e => e.id == h).ingredients,
                s = document.createElement("input");
            s.type = "text", s.value = i.innerText, n.replaceChild(s, i);
            let m = document.createElement("button");
            m.id = `submitPatch-${h}`, m.innerText = "Submit", m.dataset.buttonType = "submit", n.replaceChild(m, a), l().then(e => {
                o.innerHTML = r(e);
                for (let e = 0; e < o.children.length; e++) {
                    let t = o.children[e].children[1];
                    u.includes(t.dataset.id) && (t.checked = !0)
                }
            })
        }(e) : "submit" == n ? function(e) {
            let t = e.target.parentElement.dataset.id,
                n = e.target.parentElement.children[0].value,
                i = c(e.target.parentElement.children[4].children),
                d = {
                    method: "PATCH",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: n,
                        ingredients: i
                    })
                };
            fetch(`http://localhost:3000/ice_cream/${parseInt(t)}`, d).then(() => {
                a()
            })
        }(e) : "delete" == n && function(e) {
            let t = e.target.parentElement.parentElement.dataset.id;
            fetch(`http://localhost:3000/ice_cream/${parseInt(t)}`, {
                method: "DELETE"
            }).then(() => {
                a()
            })
        }(e)
    }), a()
});
