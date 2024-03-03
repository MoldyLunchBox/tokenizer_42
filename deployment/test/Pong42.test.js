const Pong42 = artifacts.require('Pong42')

contract('Pong42', (accounts)=>{
    before(async()=>{
        instance = await Pong42.deployed()
    })
    it('ensures that the starting balance is 0', async ()=>{
        let balance = await instance.getMyBalance()
        assert.equal(balance, 0, 'the initial balance should be 0') 
    })

    it('ensures that the balance of Pong42 can be updated', async ()=>{
        await instance.mintTokens(accounts[0],20)
        let balance = await instance.getMyBalance()
        assert.equal(balance, 20, 'The balance should be 20 after minting 20') 
    })
})