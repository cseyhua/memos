import { Tags } from 'lucide-react'

import './TagBox.less'
import { useTagStore } from '@/store/hooks'
import { useEffect, useState } from 'react'

interface Tag {
  key: string;
  text: string;
  subTags: Tag[];
}

function TagBox(){

  const tagStore = useTagStore()
  const _tags = tagStore.tags
  const [tags, setTags] = useState<Tag[]>([])

  useEffect(() => {
    tagStore.fetchTags();
  }, [])

  useEffect(() => {
    const sortedTags = Array.from(_tags).sort();
    const root: KVObject<any> = {
      subTags: [],
    };

    for (const tag of sortedTags) {
      const subtags = tag.split("/");
      let tempObj = root;
      let tagText = "";

      for (let i = 0; i < subtags.length; i++) {
        const key = subtags[i];
        if (i === 0) {
          tagText += key;
        } else {
          tagText += "/" + key;
        }

        let obj = null;

        for (const t of tempObj.subTags) {
          if (t.text === tagText) {
            obj = t;
            break;
          }
        }

        if (!obj) {
          obj = {
            key,
            text: tagText,
            subTags: [],
          };
          tempObj.subTags.push(obj);
        }

        tempObj = obj;
      }
    }

    setTags(root.subTags as Tag[]);
  }, [_tags]);

  return (
    <div className='tag-box'>
      <div className='top'>
        <Tags size={16} />
        <div>标签集</div>
      </div>
      <div className='tags'>
        {tags.map(tag=><div key={tag.text} className='tag'>{tag.text}</div>)}
      </div>
    </div>
  )
}

export default TagBox