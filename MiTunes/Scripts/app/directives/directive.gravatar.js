miTunes.directive('multiAvatar', ['md5', function (md5) {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {

            var email = attrs.email,
                size = attrs.size,
                tag = '',
                hash = "";
            
            if ((email !== null) && (email !== undefined) && (email !== '')) {
                hash = md5.createHash(email.toLowerCase());
            }
            var src = 'https://secure.gravatar.com/avatar/' + hash + '?s='+size+'&d=mm';
            tag = '<img src=' + src + ' class="img-responsive"/>';
            element.append(tag);
        }
    };
}]);