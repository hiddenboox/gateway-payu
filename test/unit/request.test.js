import assert from 'assert'
import nock from 'nock'

import { post, get } from '../../src/helpers/request'
import { mockAuthorize, mockFail } from '../server'
import { Environment } from '../../src/consts'

describe('request', () => {
    afterEach(() => {
        nock.cleanAll()
    })

    it('throw error on nullish arguments', async () => {

        try {
            await post()
        } catch (err) {
            should.throw(() => { throw err }, assert.AssertionError, 'url should not be empty')
        }
    })

    it('should response parsed JSON with opt { json: true }', async () => {
        mockAuthorize()

        const response = await post(`${Environment.SANDBOX}/pl/standard/user/oauth/authorize`, { json: true })

        response.should.have.property('access_token')
        response.should.have.property('token_type')
        response.should.have.property('expires_in')
        response.should.have.property('grant_type')
    })

    it('should response with plain text without { json: true }', async () => {
        mockAuthorize()

        const response = await post(`${Environment.SANDBOX}/pl/standard/user/oauth/authorize`)

        response.should.be.a('string')
    })

    it('should throw error when server respond with not ok status', async () => {
        mockFail(500)

        try {
            const response = await get('https://localhost/500')
            console.log(response)
        } catch (err) {
            should.throw(() => { throw err }, Error, 'adddad')
        }

    })
})