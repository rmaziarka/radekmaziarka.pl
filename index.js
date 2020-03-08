'use strict';

/***
    Usage: blog2md b|w <BLOGGER/WordPress BACKUP XML> <OUTPUT DIR>

*/


const fs = require('fs');
const os = require('os');
const path = require('path');
const xml2js = require('xml2js');
const TurndownService = require('turndown');
var moment = require('moment');

var tds = new TurndownService({ codeBlockStyle: 'fenced', fence: '```' })

tds.addRule('wppreblock', {
    filter: ['pre'],
    replacement: function(content) {
        return '```\n' + content + '\n```'
    }
})

var outputPostsDir = 'page/content/posts';
var outputPagesDir = 'page/content/pages';
var imagesById = {};


wordpressImport();


var myMkdirSync = function(dir){
    if (fs.existsSync(dir)){
        return
    }

    try{
        fs.mkdirSync(dir)
    }catch(err){
        if(err.code == 'ENOENT'){
            myMkdirSync(path.dirname(dir)) //create parent dir
            myMkdirSync(dir) //create dir
        }
    }
}

function groupBy(list, keyGetter) {
    const map = {}
    list.forEach((item) => {
         const key = keyGetter(item);
         var array = map[key];
         if (!array) {
            map[key] = [item];
         } else {
            array.push(item);
         }
    });
    return map;
}




function wordpressImport(){
    var parser = new xml2js.Parser();


    fs.readFile('media.xml', function(err, data) {
        parser.parseString(data, (err, result) => {
            handleImagesXML(result);
            
            fs.readFile('posts.xml', function(err, data) {
                parser.parseString(data, handlePostsXML);
            });

            // fs.readFile('pages.xml', function(err, data) {
            //     parser.parseString(data, handlePagesXML);
            // });
        });
    });
}

function retrievePaths(image){
    var url = image['guid'][0]['_'];
    var imagePath = url.replace(/https:\/\/radekmaziarka.pl|https:\/\/radblog.pl|http:\/\/radblog.pl/,'').replace('/wp-content/uploads/','');
    var currentFilePath = 'uploads/' + imagePath;
    var targetFilePath = 'page/static/images/' + imagePath;
    var folderPath = 'page/static/images/' + imagePath.substring(0, 7);
    var blogPath = 'images/' + imagePath;

    var paths = {
        blogPath, currentFilePath, targetFilePath, folderPath
    };

    image.paths = paths;
}

function copyImages(image){
    myMkdirSync(image.paths.folderPath);
    fs.createReadStream(image.paths.currentFilePath).pipe(fs.createWriteStream(image.paths.targetFilePath));
}

function handleImagesXML(result){
    var images = result.rss.channel[0].item;

    images.forEach(retrievePaths);   

    //images.forEach(copyImages);    

    images.forEach(image => {
        imagesById[image['wp:post_id'][0]] = image;
    });
}

function handlePostsXML(err, result) {
    if (err) {
        console.log(`Error parsing xml file (${backupXmlFile})\n${JSON.stringify(err)}`); 
        return 1;
    }
    // console.dir(result); 
    // console.log(JSON.stringify(result)); return;
    var posts = [];
    
    // try {
        posts = result.rss.channel[0].item;
        
        console.log(`Total Post count: ${posts.length}`);

        posts = posts.filter(function(post){
            var status = '';
            if(post["wp:status"]){
                status = post["wp:status"].join(''); 
            }
            // console.log(post["wp:status"].join(''));
            return status != "private" && status != "inherit" 
        });


        // console.log(posts)
        console.log(`Post count: ${posts.length}`);

        var title = '';
        var slug = '';
        var content = '';
        var tags = [];
        var categoryName = '';
        var published = '';
        var comments = [];
        var fname = '';
        var markdown = '';
        var fileContent = '';
        var fileHeader = '';
        var postMaps = {};
        var featuredImagePath = '';
        
        posts.forEach(function(post){
            var postMap = {};

            title = post.title[0].trim();
            slug = post.link[0].trim().replace('https://radekmaziarka.pl','');
            
            title = title.replace(/'/g, "''");


            published = post.pubDate;

            // not published 
            if(published === 'Thu, 01 Jan 1970 00:00:00 +0000')
                return;

            var publishedDate = new Date(published);
            var publishedFolderName = publishedDate.toISOString().slice(0,4) + '/' + publishedDate.toISOString().slice(0,7)
            comments = post['wp:comment'];
            fname = post["wp:post_name"][0] || post["wp:post_id"];
            markdown = '';

            console.log(`\n\n\n\ntitle: '${title}'`);
            console.log(`published: '${published}'`);
            
            if (comments){
                console.log(`comments: '${comments.length}'`);    
            }
            
            tags = [];

            var categories = post.category;
            var tagString = '';

            if (categories && categories.length){
                categories.forEach(function (category){

                    if(category.$.domain === 'post_tag')
                        tags.push(category['_']);
                    else if (category.$.domain === 'category')
                        categoryName = category['_'];
                });

                // console.log(tags.join(", "));
                // tags = tags.join(", ");
                tagString = 'tags: [\'' + tags.join("', '") + "']\n";
                // console.log(tagString);
            }

            featuredImagePath = '';
            var metaArray = post['wp:postmeta'] || [];
            var featuredThumbnailMeta = metaArray.filter(meta => {
                return meta['wp:meta_key'][0] === '_thumbnail_id';
            })[0];

            if(featuredThumbnailMeta){
                var featuredImageId = featuredThumbnailMeta['wp:meta_value'][0];
                var featuredImage = imagesById[featuredImageId];
                featuredImagePath = featuredImage.paths.blogPath;
            }

            var pmap = {fname:'', comments:[]};
            pmap.fname = outputPostsDir+'/'+fname+'-comments.md';

            fname = outputPostsDir+'/'+publishedFolderName+ '/'+fname+'.md';
            var fdir = outputPostsDir+'/'+publishedFolderName + '/';
            pmap.postName = fname;
            console.log(`fname: '${fname}'`);
            
            if (post["content:encoded"]){
                console.log(post["content:encoded"]);
                content = '<div>'+post["content:encoded"]+'</div>'; //to resolve error if plain text returned
                markdown = tds.turndown(content);
                // console.log(markdown);

                fileHeader = ''
                fileHeader += `---\ntitle: '${title}'\nslug: '${slug}'\ndate: ${published}\ndraft: false\n`;
                if(featuredImagePath)
                    fileHeader+= `featured_image: '${featuredImagePath}'\n`;
                fileHeader+=`category: '${categoryName}'\n${tagString}---\n`
                fileContent = `${fileHeader}\n${markdown}`;
                pmap.header = `${fileHeader}\n`;

                // fileContent = `---\ntitle: '${title}'\ndate: ${published}\ndraft: false\n${tagString}---\n\n${markdown}`;

                
                myMkdirSync(fdir);
                writeToFile(fname, fileContent);
                
            }

            //comments:
            /*
                "wp:comment" [.each]
                    wp:comment_author[0]
                    wp:comment_author_email[0]
                    wp:comment_author_url[0]
                    wp:comment_date[0]
                    wp:comment_content[0]
                    wp:comment_approved[0] == 1
                wp:post_id

            */
            var comments = post["wp:comment"] || [];
            // console.dir(comments);
            var anyApprovedComments = 0;
            var ccontent = '';
            comments.forEach(function(comment){
                // console.log('')
                if(comment["wp:comment_approved"].pop()){
                    anyApprovedComments = 1;

                    var cmt = {title:'', published:'', content:'', author:{}};

                    cmt.published = (comment["wp:comment_date"]?comment["wp:comment_date"].pop():'');

                    var cont = '<div>'+comment["wp:comment_content"].pop()+'</div>';
                    cmt.content = (comment["wp:comment_content"]?tds.turndown(cont):'');

                    cmt.author.name = (comment["wp:comment_author"]?comment["wp:comment_author"].pop():'');
                    cmt.author.email = (comment["wp:comment_author_email"]?comment["wp:comment_author_email"].pop():'');
                    cmt.author.url = (comment["wp:comment_author_url"]?comment["wp:comment_author_url"].pop():'');

                    ccontent += `#### [${cmt.author.name}](${cmt.author.url} "${cmt.author.email}") - ${cmt.published}\n\n${cmt.content}\n`;

                    pmap.comments.push(cmt);
                }
            });

            //just a hack to re-use blogger writecomments method
            if (pmap && pmap.comments && pmap.comments.length){
                writeComments({"0": pmap});
            }

        });

}

function handlePagesXML(err, result) {
    if (err) {
        console.log(`Error parsing xml file (${backupXmlFile})\n${JSON.stringify(err)}`); 
        return 1;
    }
    // console.dir(result); 
    // console.log(JSON.stringify(result)); return;
    var posts = [];
    
    // try {
        posts = result.rss.channel[0].item;
        
        console.log(`Total Post count: ${posts.length}`);

        posts = posts.filter(function(post){
            var status = '';
            if(post["wp:status"]){
                status = post["wp:status"].join(''); 
            }
            // console.log(post["wp:status"].join(''));
            return status != "private" && status != "inherit" 
        });


        // console.log(posts)
        console.log(`Post count: ${posts.length}`);

        var title = '';
        var slug = '';
        var content = '';
        var categoryName = '';
        var published = '';
        var comments = [];
        var fname = '';
        var markdown = '';
        var fileContent = '';
        var fileHeader = '';
        var featuredImagePath = '';
        
        posts.forEach(function(post){
            var postMap = {};

            title = post.title[0].trim();
            slug = post.link[0].trim().replace('https://radekmaziarka.pl','');
            
            title = title.replace(/'/g, "''");

            published = post.pubDate;
            fname = post["wp:post_name"][0] || post["wp:post_id"];
            markdown = '';
            
            featuredImagePath = '';
            var metaArray = post['wp:postmeta'] || [];
            var featuredThumbnailMeta = metaArray.filter(meta => {
                return meta['wp:meta_key'][0] === '_thumbnail_id';
            })[0];

            if(featuredThumbnailMeta){
                var featuredImageId = featuredThumbnailMeta['wp:meta_value'][0];
                var featuredImage = imagesById[featuredImageId];
                featuredImagePath = featuredImage.paths.blogPath;
            }

            fname = outputPagesDir+'/'+fname+'.md';
            
            if (post["content:encoded"]){
                // console.log('content available');
                content = '<div>'+post["content:encoded"]+'</div>'; //to resolve error if plain text returned
                markdown = tds.turndown(content);
                // console.log(markdown);

                fileHeader = ''
                fileHeader += `---\ntitle: '${title}'\nslug: '${slug}'\ndate: ${published}\ndraft: false\n`;
                if(featuredImagePath)
                    fileHeader+= `featured_image: '${featuredImagePath}'\n`;
                fileHeader+='---\n';
                fileContent = `${fileHeader}\n${markdown}`;

                writeToFile(fname, fileContent);                
            }

        });

}

function writeComments(postMaps){

    for (var pmap in postMaps){
        var comments = postMaps[pmap].comments;
        console.log(`post id: ${pmap} has ${comments.length} comments`);
        // console.dir(comments);

        if (comments.length){
            var ccontent = '';
            comments.forEach(function(comment){
                var readableDate = '<time datetime="'+comment.published+'">' + moment(comment.published).format("MMM d, YYYY") + '</time>';

                ccontent += `#### ${comment.title}\n[${comment.author.name}](${comment.author.url} "${comment.author.email}") - ${readableDate}\n\n${comment.content}\n`;
            });

            writeToFile(postMaps[pmap].postName, `\n\n---\n### Comments:\n${ccontent}`, true);
        }
    }
}

function writeToFile(filename, content, append=false){

    if(append){
        console.log(`DEBUG: going to append to ${filename}`);
        try{
            fs.appendFileSync(filename, content);
            console.log(`Successfully appended to ${filename}`);
        }
        catch(err){
            console.log(`Error while appending to ${filename} - ${JSON.stringify(err)}`);
            console.dir(err);
        }

    }else{
        console.log(`DEBUG: going to write to ${filename}`);
        try{
            fs.writeFileSync(filename, content);
            console.log(`Successfully written to ${filename}`);
        }
        catch(err){
            console.log(`Error while writing to ${filename} - ${JSON.stringify(err)}`);
            console.dir(err);
        }
    }
    
}
