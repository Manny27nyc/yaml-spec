// Generated by CoffeeScript 2.5.1
(function() {
  var TestReceiver, event_map, style_map;

  require('./prelude');

  require('./receiver');

  event_map = {
    stream_start: '+STR',
    stream_end: '-STR',
    document_start: '+DOC',
    document_end: '-DOC',
    mapping_start: '+MAP',
    mapping_end: '-MAP',
    sequence_start: '+SEQ',
    sequence_end: '-SEQ',
    scalar: '=VAL',
    alias: '=ALI'
  };

  style_map = {
    plain: ':',
    single: "'",
    double: '"',
    literal: '|',
    folded: '>'
  };

  global.TestReceiver = TestReceiver = class TestReceiver extends Receiver {
    output() {
      var list;
      list = this.event.map(function(e) {
        var event, style, type, value;
        type = event_map[e.event];
        event = [type];
        if (type === '+DOC' && e.explicit) {
          event.push('---');
        }
        if (type === '-DOC' && e.explicit) {
          event.push('...');
        }
        if (type === '+MAP' && e.flow) {
          event.push('{}');
        }
        if (type === '+SEQ' && e.flow) {
          event.push('[]');
        }
        if (e.anchor) {
          event.push(`&${e.anchor}`);
        }
        if (e.tag) {
          event.push(`<${e.tag}>`);
        }
        if (e.name) {
          event.push(`*${e.name}`);
        }
        if (e.value != null) {
          style = style_map[e.style];
          value = e.value.replace(/\\/g, '\\\\').replace(/\x08/g, '\\b').replace(/\t/g, '\\t').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\x20$/g, '<SPC>');
          event.push(`${style}${value}`);
        }
        return event.join(' ') + "\n";
      });
      return list.join('');
    }

  };

  // vim: sw=2:

}).call(this);
