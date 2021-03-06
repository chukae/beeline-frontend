import commonmark from 'commonmark';

var reader = new commonmark.Parser({safe: true});
var writer = new commonmark.HtmlRenderer({safe: true});

export default ['CompanyService', '$q',
function companyTnc(CompanyService, $q) {
  return {
    template: require('./companyTnc.html'),
    replace: false,
    scope: {
      companyId: '=',
      features: '=',
    },
    link: function(scope, elem, attr) {
      scope.company = {};

      scope.$watch('companyId', function() {
        if (!scope.companyId) {
          scope.company = null;
          return;
        }

        var companyPromise = CompanyService.getCompany(scope.companyId)
        .then((company) => {
          scope.company = company;
          scope.$emit('companyTnc.done');
          return company;
        });
      });

      scope.showTerms = () => {
        if (!scope.company) return;

        CompanyService.showTerms(scope.company.id);
      }
    }
  };
}]
