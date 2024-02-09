/*
 * STSWENG -XX22
 * Test-Driven Development (TDD) with Jest
 * Members: Rojo, Kate Lynn
 *          Romblon, Kathleen Mae 
 */

const sinon = require('sinon');
const PostModel = require('../models/post.model');
const PostController = require('../controllers/post.controller');


describe('Post controller', () => {
    // Setup the responses
    let req = {
        body: {
            author: 'stswenguser',
            title: 'My first test post',
            content: 'Random content'
        }
    };

    let error = new Error({ error: 'Some error message' });

    let res = {};

    let expectedResult;

    
    
    describe('create', () => {
        var createPostStub;

        beforeEach(() => {
            // before every test case setup first
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
        });

        afterEach(() => {
            // executed after the test case
            createPostStub.restore();
        });


        it('should return the created post object', () => {
            // Arrange
            expectedResult = {
                _id: '507asdghajsdhjgasd',
                title: 'My first test post',
                content: 'Random content',
                author: 'stswenguser',
                date: Date.now()
            };
                                                    //createPost
            createPostStub = sinon.stub(PostModel, 'createPost').yields(null, expectedResult);

            // Act
            PostController.create(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.createPost, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req.body.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: req.body.author }));

        });


        // Error Scenario
        it('should return status 500 on server error', () => {
            // Arrange
                                                    //createPost
            createPostStub = sinon.stub(PostModel, 'createPost').yields(error);

            // Act
            PostController.create(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.createPost, req.body);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });

        //disconnect
        // serverConn.close()
        
    });

    describe('update', () => {
        var updatePostStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
            expectedResult = req.body
            
            //Stub the updatePost method before each test case
            updatePostStub = sinon.stub(PostModel, 'updatePost');
        });

        afterEach(() => {
            //Restore the stubbed updatePost method after each test case
            updatePostStub.restore();
        })

        it('should return updated post', () => {
            // Arrange
            //updatePostStub = sinon.stub(PostModel, 'updatePost').yields(null, expectedResult);
            updatePostStub.yields(null, expectedResult);

            // Act
            PostController.update(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.updatePost, req.body, { new: true });
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req.body.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: req.body.author }));
        });

        it('should return status 404 for nonexisting post', () => {
            // Arrange
            //updatePostStub = sinon.stub(PostModel, 'updatePost').yields(null, null);
            updatePostStub.yields(null, null);            
            
            // Act
            PostController.update(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.updatePost, req.body, { new: true });
            sinon.assert.calledWith(res.status, 404);
            sinon.assert.calledOnce(res.status(404).end);
        });

        it('should return status 500 on server error', () => {
            // Arrange
            //updatePostStub = sinon.stub(PostModel, 'updatePost').yields(error);
            updatePostStub.yields(error);

            // Act
            PostController.update(req, res);

            // Assert
            sinon.assert.calledWith(PostModel.updatePost, req.body, { new: true });
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });


    });

    describe('findPost', () => {
        var findPostStub;

        beforeEach(() => {
            res = {
                json: sinon.spy(),
                status: sinon.stub().returns({ end: sinon.spy() })
            };
            expectedResult = req.body;
        });
    
        it('should return find post object', () => {
            findPostStub = sinon.stub(PostModel, 'findPost').yields(null, expectedResult);

            PostController.findPost(req, res); // Corrected to use PostController.findPost

            sinon.assert.calledWith(PostModel.findPost, req.body);
            sinon.assert.calledWith(res.json, sinon.match({ title: req.body.title }));
            sinon.assert.calledWith(res.json, sinon.match({ content: req.body.content }));
            sinon.assert.calledWith(res.json, sinon.match({ author: req.body.author }));
        });
    
        it('should return 404 for non-existing post', () => {
            // findPostStub = sinon.stub(PostModel, 'findPost').yields(null, null); 
            findPostStub.yields(null, null);

            PostController.findPost(req, res); 

            sinon.assert.calledWith(PostModel.findPost, req.body);
            sinon.assert.calledWith(res.status, 404);
            sinon.assert.calledOnce(res.status(404).end);
        });
    
        it('should return status 500 on server error', () => {
            // findPostStub = sinon.stub(PostModel, 'findPost').yields(error); 
            findPostStub.yields(error);

            PostController.findPost(req, res); 

            sinon.assert.calledWith(PostModel.findPost, req.body);
            sinon.assert.calledWith(res.status, 500);
            sinon.assert.calledOnce(res.status(500).end);
        });
    });

})