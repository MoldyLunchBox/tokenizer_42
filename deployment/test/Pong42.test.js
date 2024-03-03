const Pong42 = artifacts.require('Pong42')

contract('Pong42', (accounts)=>{
    before(async()=>{
        instance = await Pong42.deployed()
    })
    it('ensure that the starting balance is 0', async ()=>{
        let balance = await instance.getBalance(accounts[0])
        assert.equal(balance, 0, 'the initial balance should be 0') 
    })
})