# Gulp Workflow

To make it easier to understand what's going on with gulp, we're going to detail
the process below.

Calling simply:
```
$ gulp
```
will trigger the gulp task `default` which will call gulp task `prod` which is
responsible for handling all preparation for get the source code ready for the
production environment.

Prod will first clean the folder where the code will be copied to, and will then
copy all relevant assets, concatenate compatible css/js into bundles (to reduce
network request calls), and then minify css/js/images to reduce size.

Dev will also run most of the same things as prod, accept it doesn't minify in
the interest of saving time and improving ease of debugging. It also builds the
documentation from code commments so that developers can easily get to work.

gulp.series forces tasks to run in order. gulp.parallel allows tasks to run in
parallel.

paths is a variable that we use to easily update paths for source code and where
to distribute the code to. If you want to change the source hierarchy and build
hierarchy, that should enable changes to be made painlessly.

## Concatting and Bundling

In order to reduce the amount of page imports and increase page loading times, we 
concatenated as many css and js files together as possible. The results were bundle.css, 
bundleAppoitments.css, and bundle.js. We also minified the css, js, and images to 
reduce size. You can see the contents of each concatenated files in `dist/css` or
`dist/js` or `dist/images` (minified images)

## bundle.css

This file is mainly the css for the index page. It gets its own bundle because most of 
its css imports differ from the other pages that are very similar in layout and have many 
overlapping imports. 

## bundleAppointments.css

This file is the main overlapping css files that the other pages besides index all share. It 
isn't just every css file concatenated together because some of the files don't actually work
when concatenated. The main examples would be the css in the native folder. The ordering of imports
also matters, so because sometimes files sharing the same css property names would overwrite 
each other causing errors.

## bundle.js
Most pages all share the same javascript files and functions within js files are less likely to 
contain the same name so it was easier to concatenate many of them together compared to the
css files. 
