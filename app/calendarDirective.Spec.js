describe('monthDrop', function() {

    var scope,
        element,
        compiled,
        html,
        mp4Src,
        oggSrc;

    beforeEach(module("calendarDemoApp"));
    beforeEach(module('month-dropdown.html'));
    beforeEach(inject(function($rootScope, $compile) {

        var html = "<span month-drop>";

        scope = $rootScope.$new();
        compiled = $compile(html);
        element = compiled(scope);
        scope.$digest();

    }));
    it('should render the element correctly', function(){

        var month;
        var offset = -1;

        console.log(element.find('select'));
        expect(element.find('select')).toBeDefined();
        expect(element.find('option').eq(0).attr('label')).toBe('January');
        expect(element.find('option').eq(1).attr('label')).toBe('February');
        expect(element.find('option').eq(6).attr('label')).toBe('July');
        expect(element.find('option').eq(11).attr('label')).toBe('December');
        expect(element.find('option').eq(12).attr('label')).toBeUndefined();

        //Check that current month is selected.
        month = new Date().getMonth();
        expect(element.find('option').eq(month).attr('selected')).toBe('selected');

        // Check if other months are not selected
        for (var i = 0; i < 12; i++) {
            if (i === month) // skip current month
                continue;
            expect(element.find('option').eq(i).attr('selected')).toBeUndefined();
        }

    });
});
