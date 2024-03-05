import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'replace'
})
export class ReplacePipe implements PipeTransform {

  transform(value: string, keyValueReplacementArray: {[key:string]: string}): any {
    var keyRegexp = new RegExp(Object.keys(keyValueReplacementArray).join('|'), 'g');

    return value.replace(keyRegexp, function(matched: string) {
      return keyValueReplacementArray[matched];
    });
  }
}