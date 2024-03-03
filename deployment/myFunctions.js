let insta = await Pong42.deployed()

let balance  = async (num)=>{ let inst = await Pong42.deployed(); let res = await inst.balanceOf(accounts[0]); return !num ? res : res.toNumber() }

