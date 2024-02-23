import { Actionable, Button, Component, Container, Flex, IComponent, Icon, Text, Wrap, colors, padding } from "@lenra/app";
import PostStat from "../../classes/PostStat";
import { numberToDateAndTimeStr } from "../../utils/string";
import Platform from "../../classes/Platform";
import Post from "../../classes/Post";

export default function (stats: PostStat[], props: { platform: Platform, post: Post, limit?: number, pagination?: number }): Component<IComponent> | IComponent {
    if (stats.length == 0) {
        return Text("No data yet")
            .textAlign("center");
    }
    const limit = props.limit || props.pagination;
    let filteredStats = stats
        .sort((a, b) => b.date - a.date);
    if (limit) filteredStats = filteredStats.slice(0, limit);
    const fields = PostStat.fields.filter(field => filteredStats.find(stat => {
        return field.name in stat
    }));
    const children = filteredStats.map((stat, i) => {
        const date = numberToDateAndTimeStr(stat.date)
        return Actionable(Container(
            Wrap([
                    Text(date.join(' ')),
                    ...fields.map(field => fieldValue(field, stat, stats[i + 1])),
                ])
            ).padding(padding.symmetric(0, 8)))
        .onLongPressed("@lenra:navTo", {
            path: `/${props.platform.slug}/${props.post.slug}/${stat.slug}/edit`
        })
        .onDoublePressed("@lenra:navTo", {
            path: `/${props.platform.slug}/${props.post.slug}/${stat.slug}/edit`
        });
    });
    if (children.length == 1) return children[0];
    return Flex(children)
        .spacing(16)
        .crossAxisAlignment("stretch")
        .direction("vertical");
}

function fieldValue(field, stat, previousStat) {
    const isManaged = field.name in stat;
    const children: any[] = [
        Icon(field.icon)
            .size(16)
            .semanticLabel(field.displayName),
        Text(isManaged ? `${stat[field.name]}` : '-')
    ];
    console.log(field, stat, children)
    // Don't seems to be managed yet
    if (previousStat && isManaged && field.name in previousStat) {
        const diff = stat[field.name] - previousStat[field.name];
        if (diff == 0) {
            children.push(
                Icon("minimize")
                    .color(colors.LenraColors.yellowPulse)
                    .size(12)
            );
        }
        else {
            const negative = diff > 0 && field.negative || diff < 0 && !field.negative;
            const percent = previousStat[field.name] == 0 ? 100 : Math.round(100 * Math.abs(diff) / previousStat[field.name]);
            const icon = negative
                ? Icon("arrow_downward").color(colors.LenraColors.redPulse)
                : Icon("arrow_upward").color(colors.LenraColors.greenPulse)
            icon.size(12);
            children.push(
                Flex([
                    icon,
                    Text(`${percent}%`)
                        .style({
                            fontSize: 12,

                        })
                ])
                    .spacing(2)
                    .crossAxisAlignment("center")
            );
        }
    }
    return Container(
        Flex([
            ...children
        ])
            .spacing(8)
            .crossAxisAlignment("end")
    ).minWidth(88);
}
