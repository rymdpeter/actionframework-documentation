# Action Framework documentation
Static documentation built from several files

## How to use the documentation tool
Download code. Open terminal at project location. Install dependencies `npm install`. Create folders in docs, or modify example contents. This is where you put your partial html or markdown files. Names of the document sections is derived from file- and folder names.


## Custom styles and scripts
Put js and css files in "scripts" and "styles" respectively to have them included inline in the output document.

## Syntax highlight
The project comes preconfigured with prismjs for c#, asp.net, javascript, css and markup. Add code blocks wrapped in applicable tags to partial html files to have them output highlighted.
```
<pre class="language-aspnet"><code>
```

## Assets (adding images)
Put image files into `assets` folder and link them relative to *root project path*, like so: `<img src="assets/my-image.png" />` Supported formats are .jpg, .gif, .png. Files are encoded into base64 and inserted inline.
