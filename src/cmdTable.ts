import {getRandom} from "./commands/random"
import { newQuote } from "./commands/new"
import { list } from "./commands/list"
import { stats } from "./commands/stats"
import { setTemplate } from "./commands/template"
import { update } from "./commands/update"
import { edit } from "./commands/edit"
import { init } from "./commands/init"

export const commands = [
    {
        invokers: [
            "quote",
            "random"
        ],
        permission: [
            "everyone"
        ],
        function: getRandom
    },
    {
        invokers: [
            "new"
        ],
        permission: [
            "everyone"
        ],
        function: newQuote
    },
    {
        invokers: [
            "list"
        ],
        permission: [
            "everyone"
        ],
        function: list
    },
    {
        invokers: [
            "stat",
            "stats",
            "statistics"
        ],
        permission: [
            "everyone"
        ],
        function: stats
    },
    {
        invokers: [
            "template",
            "setTemplate"
        ], 
        permission: [
            "735448946654183464"
        ],
        function: setTemplate
    },
    {
        invokers: [
            "update"
        ], 
        permission: [
            "735448946654183464"
        ],
        function: update
    },
    {
        invokers: [
            "edit"
        ],
        permission: [
            "everyone"
        ],
        function: edit
    },
    {
        invokers: [
            "init",
            "initialize",
            "initialise"
        ],
        permission: [
            "everyone"
        ],
        function: init
    }
]