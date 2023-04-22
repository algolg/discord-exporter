# discord-exporter
A tool that uses Discord's API to export server messages

## Dependencies

- [node.js](https://nodejs.org/en)
- [axios](https://www.npmjs.com/package/axios)
- [prompt-sync](https://www.npmjs.com/package/prompt-sync)

## Installation and Setup

1. Clone the repo
   ```sh
   git clone https://github.com/algolg/discord-exporter
   ```
   ```sh
   cd discord-exporter
   ```

2. Install dependencies
   ```sh
   npm install
   ```

3. <details>
      <summary>Edit config.json</summary>
      <ul>
        <li><code>token</code>
            <ul>
                <li>Discord user/bot token</li>
            </ul>
        </li>
        <li><code>server_or_dm</code>
            <ul>
                <li><code>"server"</code> if exporting a server, <code>"dm"</code> if exporting a DM</li>
            </ul>
        </li>
        <li><code>root_id</code>
            <ul>
                <li>ID of the server/DM</li>
                <li>Right click on the server/DM and click Copy Server/DM ID</li>
            </ul>
        </li>
        <li><code>channel_id</code>
            <ul>
                <li>For servers: if exporting a specific channel, include the ID of the channel here as a string</li>
                <li>Otherwise, keep as <code>null</code></li>
            </ul>
        </li>
        <li><code>starting_message_num</code>
            <ul>
                <li>The nth message in the server to start exporting at</li>
                <li>e.g. setting to 0 will start at message 0</li>
            </ul>
        </li>
        <li><code>num_of_messages</code>
            <ul>
                <li>The total number of messages to export</li>
            </ul>
        </li>
        <li><code>output_file_name</code>
            <ul>
                <li>Name of the JSON file to output</li>
            </ul>
        </li>
        <li><code>overwrite</code>
            <ul>
                <li>Set to `false` to prevent output files from automatically being overwritten</li>
                <li>Set to `true` to automatically overwrite the output file</li>
            </ul>
        </li>
      </ul>
    </details>

## Usage

Run discord-exporter.js
```sh
node discord-exporter.js
```
In the program's directory, you'll see a JSON file containing the exported messages
