import { EditContainer } from "../components";
import EditBottomNav from "./BottomNav";
import EditContent from "./Content";
// import Divider from "./Divider";
import EditTags from "./Tags";
import EditTitle from "./Title";

export default function EditSection() {
  return (
    <EditContainer>
      <EditTitle />
      <EditTags />
      <EditContent />
      <EditBottomNav />
    </EditContainer>
  )
}