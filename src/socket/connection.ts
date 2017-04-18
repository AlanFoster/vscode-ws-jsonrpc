/* --------------------------------------------------------------------------------------------
 * Copyright (c) 2017 TypeFox GmbH (http://www.typefox.io). All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import { MessageConnection, createMessageConnection, Logger } from "vscode-jsonrpc";
import { Socket } from "./socket";
import { SocketMessageReader } from "./reader";
import { SocketMessageWriter } from "./writer";

export function createSocketConnection(socket: Socket, logger: Logger): MessageConnection {
    const messageReader = new SocketMessageReader(socket);
    const messageWriter = new SocketMessageWriter(socket);
    const connection = createMessageConnection(messageReader, messageWriter, logger);
    connection.onClose(() => connection.dispose());
    return connection;
}
