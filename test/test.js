import assert from 'power-assert';
import RelativeTime from '../src/RelativeTime';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

/*
    <b><RelativeTime value={1492630940000} titleFormat="YYYY/MM/DD HH:mm"/></b><br/>
    <b><RelativeTime value={"2018-07-17"} titleFormat="YYYY/MM/DD HH:mm"/></b><br/>
    <b><RelativeTime value={new Date(2017, 3, 19, 22, 33, 44, 666)} titleFormat="YYYY/MM/DD HH:mm"/></b><br/>
*/


describe('react-relative-time', function() {
  let date = new Date(Date.UTC(1987, 4, 8, 5, 0, 0, 0));

  it('renders date', function() {
    let markup = ReactDOMServer.renderToString(<RelativeTime value={date} />);
    assert(/1987\-05\-08/.test(markup));
  });

  it('renders the title in specified format', function() {
    let markup = ReactDOMServer.renderToString(<RelativeTime value={date} titleFormat="YYYY" />);
    assert(/title="1987"/.test(markup));
  });

  it('transfers props down to DOM element', function() {
    let markup = ReactDOMServer.renderToString(<RelativeTime value={date} className="xyz" />);
    assert(/class="xyz"/.test(markup));
  });

  it('allows passing milliseconds from epoch', function() {
    let markup = ReactDOMServer.renderToString(<RelativeTime value={1} />);
    assert(/1970\-01\-01/.test(markup) || /1969\-12\-31/.test(markup));
  });

  it('allows passing ISO-8601 string', function() {
    let markup = ReactDOMServer.renderToString(<RelativeTime value="1970-01-01T00:00:00Z" />);
    assert(/1970\-01\-01/.test(markup));
  });

  it('does not render current date if value is invalid or null', function() {
    let markup = ReactDOMServer.renderToString(<RelativeTime />);
    assert(/Invalid date/.test(markup));
  });
});
