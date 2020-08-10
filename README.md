# Style Guide for NAEP Assessments
The NAEP Style Guide is an online document that provides guidance
for a wide range of styles for NAEP's assessments,
including user experience, media, language, and item development.

## Setting up a Development Environment in Microsoft Windows
The style guide is built using several tools,
which must be set up before you can begin working on it.
Setup for each tool is described below.

1. Install [Atom](https://atom.io), a code editor.
   (Or you can use your preferred code editor,
   though Atom is nice because it's integrated with GitHub
   and has lots of cool add-on [packages](https://atom.io/packages/list).)
   The first time you run Atom,
   it will ask if you want it to be your default editor. Select **Yes**.
1. Set up git, which is the tool used to control versioning of the style guide.
    * Create a [GitHub](https://github.com/) account if you do not already have one.
    * Install [GitHub Desktop](https://desktop.github.com/).
      (GitHub Desktop is a graphical user interface for git.
      You'll use it for most of your interactions with git.)
    * Clone (i.e., copy to your computer) the style guide repository:
      * On the GitHub repository page, select **Clone or download**.
        Then select **Open in Desktop**.
      * In GitHub Desktop, select **Clone**.
    * Install [Git Bash](https://git-scm.com/download/win).
      Accept all the default options, except choose Nano Plus for your default text editor.
      (Git Bash is a command line interface for git. Rather than using buttons and menus,
      it lets you type commands. You use Git Bash to run Grunt commands, as described below.)
    * Tell GitHub Desktop to use Git Bash as its default command line interface:
      * In GitHub Desktop, go to **File > Options**.
      * Select the **Advanced** tab.
      * In the **Shell** dropdown menu, select **Git Bash**.
      * Select **Save**.
      * Close and reopen GitHub Desktop.
1. Install [nvm-windows](https://github.com/coreybutler/nvm-windows/releases),
   which will allow you to install npm, the Node package manager.
   (A package manager allows you to download and update the code packages
   on which a project depends. In our case, the packages are Grunt and DocumentJS.)
     * Choose the `nvm-setup.zip` version.
     * Once the ZIP file is downloaded, unzip it and run the executable file inside.
     * Once nvm is installed, go to **Repository > Open in Git Bash** in GitHub Desktop.
     * At the Git Bash command prompt, type `nvm use`. This will install Node and npm.
1. Install DocumentJS, which is the platform used to build the style guide.
    * In GitHub Desktop, go to **Repository > Open in Git Bash**.
    * At the Git Bash command prompt, type `npm install`.
      (You always have to hit enter to run commands in Git Bash.)
1. Install Grunt, which is a task runner.
   (A task runner automates rote manual tasks, like compiling a build of the guide.)
    * In the same Git Bash window, type `npm install -g grunt-cli`.
    * Close and reopen Git Bash.
1. Try out a Grunt command by typing `grunt build` in Git Bash
   to make sure everything is working. You should see a `Done, without errors` message.

## Developing and Updating Guide Content

### Getting Ready to Work
Most work on the style guide involves three processes. A different tool is used for each process:
* __Atom__: Editing and adding pages
* __Grunt (via Git Bash)__: Checking that your changes were successful
* __GitHub Desktop__: Pushing your changes to the style guide repository

To start working,
1. Open GitHub Desktop and select the `naep-style-guide` respository if it isn't selected already.
1. Go to **Repository > Open in Git Bash**.
1. In Git Bash, run `grunt default`.
1. Back in GitHub Desktop, go to **Repository > Open in Atom**.

### Editing Existing Pages
Content for guide pages is written in MarkDown, a simple syntax that uses special characters to indicate formatting like text styling, headings, lists, etc. (This readme is written in MarkDown.) A brief MarkDown reference can be found [here](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet). In Atom, you can see a preview of how your MarkDown will be rendered by pressing `Ctrl+Shift+M` on your keyboard.

To add an image, follow this syntax:
`<img src="path/to/img.png" alt="alt text" style="width: 100%;" />`

Details about the image syntax:
* The `src` attribute is used to tell the page where to find the image file. The path is relative to the location of the MarkDown file.
* The `alt` attribute is optional. It allows you to add alt text.
* The `style` tag is optional. It allows you to specify various styling details of the image. The style you'll probably use most often is `width`, which allows you to specify something other than the image's native size. (The height scales automatically with the width.) For standalone images, specify width as a percentage so that the image resizes with the content column.

In addition to the basic MarkDown features, DocumentJS also allows you to link to other pages in the guide by entering the page ID (see below) in brackets (e.g., `[color-themes.md]`).

If you need to do something not supported by MarkDown, you can include HTML elements directly in the page.

### Adding New Pages & Groups
DocumentJS uses tags at the top of source files to determine the structure of the guide.

In the directory for each section there is a file with the name `[section-name].md` (e.g., `media.md`). At the top of this file, you'll see several `@group` tags. These represent the sub-sections that will appear in the left-hand navigation menu.

To create a new sub-section, just add a new `@group` tag following the pattern of the others.

To create a new page, you need to identify a source file.
* Typically, this will be a MarkDown file that you create in the directory of your section (e.g., `keyboard-navigability.md`). (Other files can serve as source files too; check out the [DocumentJS tags tutorial page](https://documentcss.com/docs/use.html) for more info.)
* Page names should use lowercase and should separate words with hyphens (e.g., `keyboard-navigability.md`).
* Add the @page tag to the top of the file to give the file a unique ID and title.
* Add the @parent tag to indicate which group the page goes in. For example:
    > @page colors.md Colors
    >
    > @parent ux.basics

### Viewing Your Changes
The style guide has to be recompiled for any changes you make to take effect, and the updated pages have to be served to your browser. Luckily, Grunt can watch the guide's files and automatically recompile and serve them any time there's a change. If you type `grunt default` and hit Enter in Git Bash, you're telling Grunt to start that process. After you run the command, a new window in your browser will open pointed to the homepage of your working version of the style guide (http://localhost:8080/build/index.html).

Now, any time you make a change, just refresh your browser window to see it.

If for some reason you want to compile the code manually without starting a web server, type `grunt build` and hit Enter in Git Bash.

### Submitting Changes
Once you've finished editing the file(s) related to a particular change (e.g., adding a new specification), the change needs to be integrated into the style guide repository via git. While a full git tutorial is beyond the scope of this readme, the basics are described below.

Git uses a branching structure to allow multiple people to work on a project simultaneously. For the style guide, each section has its own branch (e.g., the media section branch is `dev-media`).

To commit changes to your section branch,
* Check out the branch in GitHub Desktop by selecting the "Current branch" dropdown and then selecting your branch.
* You should then see a list of all the files you've edited on the left-hand side. Check all the edits related to a particular change, write a brief summary, add a description (optional), and select "Commit."
* Your committed changes are now staged locally on your computer, but they need to be pushed to the server where the style guide repository lives. To do that, select "Push origin" at the top of the window.
* If you switch to the "History" tab, you should now see your commit.

If more than one person at a time will be working on your section, you can create additional branches off your main section branch. That's a little too complex to cover here, but there are plenty of git tutorials online.

You can push as many commits as you like while you're working in your section branch. When you're ready to submit your branch for integration into the master style guide, you need to do what's called a "pull request" to the master branch. Basically, you're saying that you've got a complete set of changes that you think are ready for review. To do that:
1. In GitHub Desktop, go to "Branch > Create pull request." This will open the GitHub website in a new browser tab.
2. On the GitHub webpage that just opened, select "master" as the base branch and your section branch as the compare branch.
3. Give your pull request a title and description that indicate the changes you've made.
4. Select the people to review the request:
    * If you're working on the UX section, include Molly Prower, Anderson Davis, and Monalisha Mishra.
    * If you're working on any other section, just include Molly.
5. Select "Create pull request."

## Ticket Tracking
Bugs, change requests, and feature requests are tracked in the GitHub Issues.

The project uses the following ticket types:
* A __bug__ is something that’s unintended (i.e., an error).
* A __change request__ is something that you’re requesting be changed.
* A __feature__ is something that you’re requesting be added.

Tickets adhere to the following formats:

* Bugs:
    * Title: _Page Title: description of ticket_ [e.g., Buttons: missing focus state]
    * Description:
      * Environment: _which browser and OS you were using when you encountered the bug_
      * Page: _section > page > page section_ [e.g., Response Types > Number Line > Points-only variant]
      * Actual behavior: _description of how the relevant element currently appears or behaves_
      * Expected behavior: _description of how the relevant element SHOULD appear or behave_
      * Notes: _if applicable_
* Change requests and features
    * Title: _description of request_
    * Description:
      * Page: _section > page > page section_ [e.g., Response Types > Number Line > Points-only variant]
      * Request: _description of the change/addition_
      * Notes: _if applicable_

Short, directive descriptions are preferred. 

## Coding Guide
This section is only relevant to people developing demos for the UX section.

### General Conventions
* Indents are 2 spaces (not tabs).
* It is strongly suggested that you use linters. (Atom has both a great [linter package](https://atom.io/packages/linter) and a great [beautifier package](https://atom.io/packages/atom-beautify).)
* In HTML and CSS,
  * Class names and IDs should be lowercase and hyphenated (`my-class`, not `myClass`).
  * Class names should describe what a class means, not how it looks (e.g., `.disabled`, not `.gray`).

### HTML
* Demo pages go in subdirectories of `/ux/demos`.
* There should be one demo subdirectory for all assets used for a given style guide page. The subdirectory should have the same name as the style guide page source file.
* An empty HTML template file called `template.html` can be found in the `/ux/demos` folder.
* Enclose HTML attribute values in double quotes, not single quotes.
* Use Unicode characters for special characters like ampersands rather than HTML entities.
* Use semantic elements whenever possible.
* Avoid inline styles and event handlers.

### CSS
* The CSS stylesheet for a widget should be set up as its source page. All widget stylesheets go in the `/ux` folder.
* Styles for the beige and dark themes go in `color-theme-beige.css` `color-theme-dark.css`, respectively, both in the `ux/demos/shared` folder.
* Use shorthand syntax whenever possible.

### JavaScript
* Code specific to a particular widget goes in the same folder as the HTML for that widget and should have the same name as the style guide source file.
* Code used by multiple widgets goes in the `/ux/demos/shared` folder. (This is unusual.)
* If you need to load additional libraries, put the library files in the `/ux/demos/lib` folder. Demos generally use jQuery, and the lib folder already includes jQuery and jQuery UI.
* Make sure all variables are enclosed in a function so that variable names do not contaminate the global namespace.
* Function and variable names are camel case with initial lowercase: `myVariable`.
* Class (prototype) names are camel case with an initial captial: `MyClass`, not `myClass`.

### Behavioral Details
The following behaviors are handled by `/ux/demos/shared/platform-utlities.js`:
* Changing state (enabled vs. disabled) of UI elements: A global state object is created and updated in `ux/demos/shared/platform-utilities.js`. If UI elements need to be disabled/enabled ad hoc, invoke updateState(target, disabled/enabled) so its state is retained after system tool toggling.
* Theming: the relevant stylesheet (see above) is appended to the document head. This means that any styles in the themed stylesheets override the defaults, so only add color changes to non-default theme stylesheets.
* TTS: A `tts-active` class is added to speakable units (or their parents in some cases), as is a `tabindex` attribute.
* Sticky hover fix: In touch environments, hover states specified in CSS can linger. To avoid that, there's a function that detects mouse and touch events. When it detects the latter, it adds a `can-touch` class to the root element. Scoping hover states in CSS to that class lets you specify different hover states for touch.
* Support for focus states specific to keyboard navigation. In various cases (e.g., interactive points and lines) one focus state is used for mouse/touch users, and a more assertive state is used for keyboard users. To facilitate that, a `focus-tabbed` class is added on keyboard focus to the specified elements.
