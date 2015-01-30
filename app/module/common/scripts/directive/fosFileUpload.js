(function (ng) {
    'use strict';
    ng.module('commonUtilsModule')
    /**
     * Custom directive to fetch the file as model attribute
     */
    .directive('fosFileModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.fosFileModel);
            var modelSetter = model.assign;

            element.bind('change', function(){
                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
    }]);
}(angular));