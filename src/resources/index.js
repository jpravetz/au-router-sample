import converters from './value-converters/index';
import elements from './elements/index';


const resources = {
  converters: converters.map(name => './value-converters/' + name),
  elements: elements.map(name => './elements/' + name)
};

const allResources = Object.values(resources)
  .reduce((all, res) => all.concat(res), []);


export function configure (aurelia) {
  aurelia.globalResources(allResources);
}
