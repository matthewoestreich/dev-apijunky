<h3 align="center">Why the need for controllers and services?</h3>
<p align="center">
The reason for this is because Controllers should separate, and be the defining
line, between where the web/Express context (<i>ie:</i> <code>req</code>, <code>res</code>, <code>next</code>) stops, and is
transformed/passed to the 'internal' services (<i>ie:</i> user service, book service, etc..)
</p>
<p align="center">
<b><i>We do not want Express context to get beyond this point.</i></b>
</p>
