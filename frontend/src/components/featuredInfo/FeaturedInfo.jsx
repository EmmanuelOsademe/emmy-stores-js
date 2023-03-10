import "./featuredInfo.css";
import {ArrowDownward, ArrowUpward} from "@mui/icons-material";

export default function FeaturedInfo(){
    return (
        <div className="featured">
            <div className="featuredItem">
                <span className="featuredTitle">Revenue</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">$36800</span>
                    <span className="featuredMoneyRate">
                        +2.5 <ArrowUpward className="featuredIcon" />
                    </span>
                    <span className="featuredSub">Compared to last month</span>
                </div>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Sales</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">$96420</span>
                    <span className="featuredMoneyRate">
                        +3.2 <ArrowUpward className="featuredIcon" />
                    </span>
                    <span className="featuredSub">Compared to last month</span>
                </div>
            </div>
            <div className="featuredItem">
                <span className="featuredTitle">Expenses</span>
                <div className="featuredMoneyContainer">
                    <span className="featuredMoney">$59620</span>
                    <span className="featuredMoneyRate">
                        -2.5 <ArrowDownward className="featuredIcon negative" />
                    </span>
                    <span className="featuredSub">Compared to last month</span>
                </div>
            </div>
        </div>
    )
}