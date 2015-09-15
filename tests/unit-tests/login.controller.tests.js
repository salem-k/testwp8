describe('LoginController', function() {

    var controller,
        deferredLogin,
        LoginServiceMock,
        LoadingServiceMock,
        stateMock;

    // TODO: Load the App Module
    beforeEach(module('appContext'));
    // TODO: Instantiate the Controller and Mocks

    beforeEach(inject(function($controller, $q,$rootScope, $controller) {



        deferredLogin = $q.defer();

        // mock dinnerService
        LoginServiceMock = {
            doLogin: jasmine.createSpy('login spy')
                          .and.returnValue(deferredLogin.promise)
        };

        // mock $state
        stateMock = jasmine.createSpyObj('$state spy', ['go']);

        // mock $ionicPopup
        LoadingServiceMock = jasmine.createSpyObj('LoadingService spy', ['alert']);

        // instantiate LoginController
        controller = $controller('LoginController', {
                        '$ionicPopup': ionicPopupMock,
                        '$state': stateMock,
                        'LoginService': LoginServiceMock }
                     );
    }));
    describe('#signIn', function() {

        // TODO: Call doLogin on the Controller

        it('should call login on dinnerService', function() {
            expect(LoginServiceMock.doLogin).toHaveBeenCalledWith('kammoun.salem@gmail.com', 'melas123');
        });

        describe('when the login is executed,', function() {
            it('if successful, should change state to my-dinners', function() {

                // TODO: Mock the login response from DinnerService

                expect(stateMock.go).toHaveBeenCalledWith('app.synchro');
            });

            it('if unsuccessful, should show a popup', function() {

                // TODO: Mock the login response from DinnerService

                expect(ionicPopupMock.error).toHaveBeenCalled();
            });
        });
    })
});
