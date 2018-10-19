import React from 'react';
import * as all from '../../../src';
import Series from '../../../src/components/Series';

const skippedSeries = ['BarSeries'];
const noAxisSeries = ['PieSeries', 'VariablePieSeries','PyramidSeries', 'FunnelSeries'];
const needParentSeries = ['BellCurveSeries','HistogramSeries', 'ParetoSeries'];

Object.keys(all).filter(name => /^[A-Z].*Series$/.test(name)).forEach((seriesName) => {
  if (skippedSeries.includes(seriesName)) return;

  const seriesType = seriesName.substring(0, seriesName.indexOf('Series')).toLowerCase();
  const SeriesComponent = all[seriesName]; // eslint-disable-line import/namespace

  let props = {};
  if(needParentSeries.includes(seriesName)) {
    props.baseSeries="myBaseSeries";
  }

  describe(`<${seriesName} />`, function ()  {

    it('renders a <Series />', function ()  {
      const wrapper = shallow(<SeriesComponent id="mySeries" {...props} />);
      expect(wrapper).to.have.type(Series);
    });
    it(`renders a <Series type="${seriesType}" />`, function () {
      const wrapper = shallow(<SeriesComponent id="mySeries" {...props} />);
      expect(wrapper).to.have.prop('type').equal(seriesType);
    });
    it('passes Data props through to <Series />', function () {
      const wrapper = shallow(<SeriesComponent id="myOtherSeries" data={[1, 2, 3, 4]} {...props}/>);
      expect(wrapper).to.have.prop('data').eql([1, 2, 3, 4]);
    });
    it('passes other props through to <Series />', function () {
      const wrapper = shallow(<SeriesComponent id="myThirdSeries" zIndex={-1} {...props} />);
      expect(wrapper).to.have.prop('zIndex').eql(-1);
    });

    if(noAxisSeries.includes(seriesName)) {
      it('does not require an axis', function () {
        const wrapper = shallow(<SeriesComponent id="myFourthSeries" {...props}/>);
        expect(wrapper).to.have.prop('requiresAxis').equal(false);
      });
    }
  });
});
