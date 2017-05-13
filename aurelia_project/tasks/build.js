import gulp from 'gulp';
import transpile from './transpile';
import processMarkup from './process-markup';
import processCSS from './process-css';
import prepareFontAwesome from './prepare-font-awesome';
import copyFiles from './copy-files';
import {build} from 'aurelia-cli';
import project from '../aurelia.json';

export default gulp.series(
  readProjectConfiguration,
  gulp.parallel(
    transpile,
    processMarkup,
    processCSS,
    copyFiles,
    prepareFontAwesome
  ),
  writeBundles
);

function readProjectConfiguration () {
  return build.src(project);
}

function writeBundles () {
  return build.dest();
}
