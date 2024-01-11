'use strict'

import { ViewRequest, View, Button, Flexible, Flex, padding, Container, Text, Form, TextField, DropdownButton, Menu, MenuItem } from "@lenra/app";
import Platform from "../../classes/Platform.js";
import Post from "../../classes/Post.js";
import ViewLayout from '../layout.js';

const pagination = 5;

/**
 * @param {*} _data
 * @param {*} props
 * @returns
 */
export default function ([post]: Post[], props: { action?: string, platform: Platform }, context: ViewRequest['context']) {
    
}
