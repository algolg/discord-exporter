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

3. Edit config.json
    <table>
        <tbody>
            <tr>
                <th>Key</th>
                <th>Meaning</th>
            </tr>
            <tr>
                <td><code>token</code></td>
                <td><ul>
                    <li>Discord user/bot token</li>
                    <li>
                        <details>
                            <summary>Getting your user token</summary>
                            <b>NOTE: Your user token is akin to a password and can give complete access to your Discord account. It should NOT be shared with anyone.</b>
                            <ol type="1">
                                <li>Open Discord and press Ctrl/Command + Shift + I</li>
                                <li>Go to the Network tab</li>
                                <li>Perform a reload (Ctrl + R)</li>
                                <li>In the "Filter" box at the top, type "/api"</li>
                                <li>Click on any of the requests that show up in the list and scroll to the "Request Headers" section</li>
                                <li>Find the string next to "authorization:" and copy that (this is your user token)</li>
                                <li>Paste your full user token as a string in config.json</li>
                            </ol>
                        </details>
                    </li>
                </ul></td>
            </tr>
            <tr>
                <td><code>server_or_dm</code></td>
                <td><ul>
                    <li><code>"server"</code> if exporting a server, <code>"dm"</code> if exporting a DM</li>
                </ul></td>
            </tr>
            <tr>
                <td><code>root_id</code></td>
                <td><ul>
                    <li>ID of the server/DM</li>
                    <li>Right click on the server/DM and click Copy Server/DM ID</li>
                </ul></td>
            </tr>
            <tr>
                <td><code>channel_id</code></td>
                <td><ul>
                    <li>For servers: if exporting a specific channel, include the ID of the channel here as a string</li>
                    <li>Otherwise, keep as <code>null</code></li>
                </ul></td>
            </tr>
            <tr>
                <td><code>starting_message_num</code></td>
                <td><ul>
                    <li>The nth message in the server to start exporting at</li>
                    <li>e.g. setting to 0 will start at message 0 (the first message)</li>
                </ul></td>
            </tr>
            <tr>
                <td><code>num_of_messages</code></td>
                <td><ul>
                    <li>The total number of messages to export</li>
                </ul></td>
            </tr>
            <tr>
                <td><code>output_file_name</code></td>
                <td><ul>
                    <li>Name of the JSON file to output</li>
                </ul></td>
            </tr>
            <tr>
                <td><code>overwrite</code></td>
                <td><ul>
                    <li>Set to <code>false</code> to prevent output files from automatically being overwritten</li>
                    <li>Set to <code>true</code> to automatically overwrite the output file</li>
                </ul></td>
            </tr>
        </tbody>
    </table>

## Usage

Run discord-exporter.js
```sh
node discord-exporter.js
```
In the program's directory, you'll see a JSON file containing the exported messages
