#Bundling/Concatenation

In order to reduce the amount of page imports and increase page loading times, we 
concatenated as many css and js files together as possible. The results were bundle.css, 
bundleAppoitments.css, and bundle.js. We also minified the css and uglified the js to 
reduce size. You can see the contents of each concatenated file in gulp/client/concat.js 
or the actual concatenated files in dist/assets/css and dist/assets/js.

##bundle.css

This file is mainly the css for the index page. It gets its own bundle because most of 
its css imports differ from the other pages that are very similar in layout and have many 
overlapping imports. 

##bundleAppointments.css

This file is the main overlapping css files that the other pages besides index all share. It 
isn't just every css file concatenated together because some of the files don't actually work
when concatenated. The main examples would be the css in the native folder. The ordering of imports
also matters, so because sometimes files sharing the same css property names would overwrite 
each other causing errors.

##bundle.js
Most pages all share the same javascript files and functions within js files are less likely to 
contain the same name so it was easier to concatenate many of them together compared to the
css files. 

##TL;DR
Concatenated a css/js files together to decrease load times, but not everything can be 
combined without causing errors.