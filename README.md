# Bundeling App SDK
The @bundeling/app-sdk is a powerful software development kit that allows developers to easily integrate Bundeling's features into their applications. This guide provides instructions on how to install and use the SDK through npm or by including the prebuilt JavaScript file in your HTML.

## Installation

### Using npm
To install the @bundeling/app-sdk via npm, follow these steps:

1. Ensure you have Node.js installed on your machine. You can verify the installation by running the following commands:
    ```bash
    node -v
    npm -v
    ```
2. Install the SDK by running the following command:
    ```bash
    npm install @bundeling/app-sdk
    ```
3. Import the SDK in your project:
    ```javascript
    import { navigate, openFile, shareUrl, openUrl, alert, toast } from '@bundeling/app-sdk';
    ```

### Including the Prebuilt JavaScript File in HTML

If you prefer not to use npm, you can include the prebuilt JavaScript file directly in your HTML file. Follow these steps:

1. Download the latest prebuilt JavaScript file from the [Bundeling SDK GitHub repository](https://github.com/Bundeling/app-sdk/dist/).
2. Add the following script tag to your HTML file, replacing path/to/bundeling-app-sdk.js with the path to the downloaded file:

    ```html
    <script src="path/to/bundeling-app-sdk.js"></script>
    ```

## Usage
When using the SDK through the prebuild JavaScript file, you can access the SDK methods through the window.bundeling object. For example, to navigate to the news page, you can use the following code:
```javascript
window.bundeling.openUrl('https://bundeling.com/contact');
```

### Available Methods
The @bundeling/app-sdk provides a variety of methods to interact with Bundeling services. Here are the available methods:

| Method           | Parameters                      | Description                                                    |
|------------------|---------------------------------|----------------------------------------------------------------|
| navigate.push    | route: string, params?: object  | Pushes a named route onto the navigation stack.                |
| navigate.replace | route: string, params?: object  | Replaces the current view with a named route.                  |
| navigate.back    | -                               | Navigates back to the previous view.                           |
| openFile         | url: string                     | Opens a file in the Bundeling app.                             |
| shareUrl         | url: string                     | Shares a URL using the Bundeling app's sharing functionality.  |
| openUrl          | url: string                     | Opens a URL in the Bundeling app's browser.                    |
| alert            | title: string, content?: string | Displays an alert dialog with a message and an optional title. |
| toast            | title: string, content?: string | Displays a toast message at the bottom of the screen.          |

### Navigation
Navigation is performed by calling `navigate.push(route, params)` to push a new view, or `navigate.replace(route, params)` to replace the current view. Path parameters in the underlying route (e.g. `:uuid`) are substituted from `params` by name.

Example:
```javascript
import { navigate } from '@bundeling/app-sdk';

// Push the user detail page onto the stack
navigate.push('user', { uuid: '123' });

// Replace the current view with a list
navigate.replace('userlist');

// Go back
navigate.back();
```

#### Available routes

| Route               | Path                              | Required params |
|---------------------|-----------------------------------|-----------------|
| user                | user/:uuid                        | uuid            |
| userlist            | user                              | -               |
| customer            | customer/:uuid                    | uuid            |
| customerlist        | customer                          | -               |
| news                | news/:uuid                        | uuid            |
| newslist            | news                              | -               |
| event               | event/:uuid                       | uuid            |
| eventlist           | event                             | -               |
| eventcalendar       | event/calendar                    | -               |
| match               | match/:uuid                       | uuid            |
| matchlist           | match                             | -               |
| matchcalendar       | match/calendar                    | -               |
| poll                | poll/:uuid                        | uuid            |
| polllist            | poll                              | -               |
| bulletinboard       | bulletinboard/:uuid               | uuid            |
| bulletinboardlist   | bulletinboard/board/:boardId      | boardId         |
| tickets             | tickets                           | -               |
| ticketscanner       | ticketScanner                     | -               |
| message             | message/:uuid                     | uuid            |
| messagelist         | message                           | -               |
| chat                | chat/:uuid                        | uuid            |
| chatlist            | chat                              | -               |
| form                | form/:form_uuid                   | form_uuid       |
| appcms              | app_cms/:childUuid                | childUuid       |
| appcmsmenu          | app_cms_menu/:menuUuid            | menuUuid        |
| timeline            | timeline                          | -               |
| search              | search                            | -               |
| settings            | settings                          | -               |
| connection          | connection                        | -               |
| personalfiles       | personalfiles                     | -               |

*Identifier values can be a numeric ID or UUID depending on the Bundeling App version.*

## Support
If you encounter any issues or have questions, please check the [issues page](https://github.com/bundeling/app-sdk/issues) on the GitHub repository or contact Bundeling support at support@bundeling.com.

## License
This project is licensed under the MIT License. See the LICENSE.TXT file for details.