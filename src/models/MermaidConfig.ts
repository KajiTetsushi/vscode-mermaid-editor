import * as vscode from 'vscode';
import * as path from 'path';
import isEmpty = require('lodash/isEmpty');
import { TextDecoder } from 'util';
import VSCodeWrapper from '../VSCodeWrapper';
import * as constants from '../constants';
import * as attributeParser from '../controllers/attributeParser';
import Logger from '../Logger';

export interface MermaidConfigChange {
  config: string;
}

export class MermaidConfig {
  private _vscodeWrapper: VSCodeWrapper;
  private _eventEmitter: vscode.EventEmitter<MermaidConfigChange>;

  private _defaultMermaidConfig: string;
  private _mermaidConfig: string;

  constructor() {
    const { theme } = this._getConfiguration();
    this._defaultMermaidConfig = JSON.stringify({
      theme
    });
    this._mermaidConfig = '';
    this._vscodeWrapper = new VSCodeWrapper();
    this._eventEmitter = new vscode.EventEmitter<MermaidConfigChange>();

    this._vscodeWrapper.onDidChangeConfiguration(() => {
      this.onDidChangeConfiguration();
    });

    // init
    this._readDefaultConfig();
  }

  private async _readFile(uri: vscode.Uri): Promise<string> {
    const config = await vscode.workspace.fs.readFile(uri);
    const decoder = new TextDecoder('utf-8');
    return decoder.decode(config);
  }

  private _getConfiguration(): vscode.WorkspaceConfiguration {
    return this._vscodeWrapper.getConfiguration(
      constants.CONFIG_SECTION_ME_PREVIEW
    );
  }

  private async _readDefaultConfig(): Promise<void> {
    const { defaultMermaidConfig, theme } = this._getConfiguration();
    try {
      const workspaceFolders = this._vscodeWrapper.workspaceFolders;
      if (defaultMermaidConfig && workspaceFolders) {
        const _resolvePath = (filePath: string): string => {
          if (filePath[0] === '~') {
            if (process && process.env['HOME']) {
              return path.join(process.env['HOME'], filePath.slice(1));
            } else {
              throw new Error('"~" cannot be resolved in your environment.');
            }
          } else if (path.isAbsolute(filePath)) {
            return filePath;
          }
          return path.join(workspaceFolders[0].uri.fsPath, filePath);
        };
        const pathToDefaultConfig = _resolvePath(defaultMermaidConfig);
        const uri = vscode.Uri.file(pathToDefaultConfig);
        this._defaultMermaidConfig = await this._readFile(uri);
        if (!isEmpty(this._mermaidConfig)) {
          this._eventEmitter.fire({
            config: this.config
          });
        }
      }
    } catch (error) {
      this._outputError(error.message);
      this._defaultMermaidConfig = JSON.stringify({
        theme
      });
    }
  }

  private _outputError(message: string): void {
    const logger = new Logger();
    logger.appendLine(message);
    logger.appendDivider();
    logger.show();
  }

  public get onDidChangeMermaidConfig(): vscode.Event<MermaidConfigChange> {
    return this._eventEmitter.event;
  }

  public get config(): string {
    return !isEmpty(this._mermaidConfig)
      ? this._mermaidConfig
      : this._defaultMermaidConfig;
  }

  public async updateConfig(
    document: vscode.TextDocument,
    code: string
  ): Promise<void> {
    const pathToConfig = attributeParser.parseConfig(code);
    if (!isEmpty(pathToConfig) && document) {
      const uri = vscode.Uri.file(
        path.join(path.dirname(document.fileName), pathToConfig)
      );
      this._mermaidConfig = await this._readFile(uri);
      this._eventEmitter.fire({
        config: this.config
      });
    }
  }

  // callbacks
  public async onDidChangeConfiguration(): Promise<void> {
    this._readDefaultConfig();
  }
}