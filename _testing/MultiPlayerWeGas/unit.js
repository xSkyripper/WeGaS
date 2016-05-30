var unit = function (id, name, startX, startY, atk, hp, ms, coins) {
    var id = id
    var name = name
    var x = startX
    var y = startY
    var atk = atk
    var hp = hp
    var ms = ms
    var coins = coins
    var icon

    return {
        id: id,
        name: name,
        x: x,
        y: y,
        atk: atk,
        hp: hp,
        ms: ms,
        coins: coins,
        icon: icon
    }
}

module.exports = unit