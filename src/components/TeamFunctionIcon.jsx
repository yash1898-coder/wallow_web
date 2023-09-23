import { teamIconLookup } from "../utils"
import { Tooltip } from "./Tooltip"

export const TeamFunctionIcon = ({ team = "Engineering", className = "" }) => {
    return (
        <div
            style={{
                backgroundColor: `var(--clr-neutral-400)`,
                border: "1px solid var(--clr-neutral-500)",
            }}
            className={` ${className} team-icon-bg`}
        >
            <Tooltip text={team}>
                <img
                    className="team-icon-bg__icon"
                    src={teamIconLookup(team.toLowerCase())}
                    alt={`${team} item icon`}
                />
            </Tooltip>
        </div>
    )
}
