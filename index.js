'use strict';

const fs = require('fs');
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

var getOutputPostsDir = (language) => `page/content/${language}/posts`;
var getOutputPagesDir = (language) => `page/content/${language}/pages`;
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

function wordpressImport(){
    var parser = new xml2js.Parser();


    fs.readFile('media.xml', function(err, data) {
        parser.parseString(data, (err, result) => {
            handleImagesXML(result);
            
            fs.readFile('posts.xml', function(err, data) {
                parser.parseString(data, handlePostsXML);
            });

            fs.readFile('pages.xml', function(err, data) {
                parser.parseString(data, handlePagesXML);
            });
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

    images.forEach(copyImages);    

    images.forEach(image => {
        imagesById[image['wp:post_id'][0]] = image;
    });
}

function handlePostsXML(err, result) {
    if (err) {
        console.log(`Error parsing xml file (${backupXmlFile})\n${JSON.stringify(err)}`); 
        return 1;
    }

    var posts = result.rss.channel[0].item;
    
    posts = posts.filter(function(post){
        var status = '';
        if(post["wp:status"]){
            status = post["wp:status"].join(''); 
        }

        return status != "private" && status != "inherit" && status != 'draft' && status != 'pending'
    });

    console.log(`Post count: ${posts.length}`);

    var title = '';
    var slug = '';
    var content = '';
    var tags = [];
    var categoryName = '';
    var published = '';
    var language = '';
    var fname = '';
    var markdown = '';
    var fileContent = '';
    var fileHeader = '';
    var featuredImagePath = '';
    
    posts.forEach(function(post){

        title = post.title[0].trim();
        slug = post.link[0].trim().replace('https://radekmaziarka.pl','');
        
        title = title.replace(/'/g, "''");


        published = post.pubDate;

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
                else if(category.$.domain === 'language')
                    language = category.$.nicename;
            });

            tagString = 'tags: [\'' + tags.join("', '") + "']\n";
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
        var outputPostsDir = getOutputPostsDir(language);
        pmap.fname = outputPostsDir+'/'+fname+'-comments.md';

        fname = outputPostsDir+'/'+publishedFolderName+ '/'+fname+'.md';
        var fdir = outputPostsDir+'/'+publishedFolderName + '/';
        pmap.postName = fname;
        console.log(`fname: '${fname}'`);
        
        if (post["content:encoded"]){
            content = '<div>'+post["content:encoded"]+'</div>'; //to resolve error if plain text returned
            markdown = tds.turndown(content);
            markdown = replaceCodeMarkups(markdown);
            markdown = replacePunctation(markdown);
            markdown = fixImagesURL(markdown);
            markdown = removeDomainHostNames(markdown);


            fileHeader = ''
            fileHeader += `---\ntitle: '${title}'\nslug: '${slug}'\ndate: ${published}\ndraft: false\n`;
            if(featuredImagePath)
                fileHeader+= `featured_image: '${featuredImagePath}'\n`;
            if(language === 'en')
                fileHeader += `aliases: ['${slug}']\n`;
            
            fileHeader+=`category: '${categoryName}'\n${tagString}---\n`
            fileContent = `${fileHeader}\n${markdown}`;
            pmap.header = `${fileHeader}\n`;
            myMkdirSync(fdir);
            writeToFile(fname, fileContent);
            
        }

        var comments = post["wp:comment"] || [];
        comments.forEach(function(comment){
            if(comment["wp:comment_approved"].pop()){
                var cmt = {title:'', published:'', content:'', author:{}};

                cmt.published = (comment["wp:comment_date"]?comment["wp:comment_date"].pop():'');

                var cont = '<div>'+comment["wp:comment_content"].pop()+'</div>';
                cmt.content = (comment["wp:comment_content"]?tds.turndown(cont):'');

                cmt.author.name = (comment["wp:comment_author"]?comment["wp:comment_author"].pop():'');
                cmt.author.email = (comment["wp:comment_author_email"]?comment["wp:comment_author_email"].pop():'');
                cmt.author.url = (comment["wp:comment_author_url"]?comment["wp:comment_author_url"].pop():'');

                pmap.comments.push(cmt);
            }
        });

        //just a hack to re-use blogger writecomments method
        if (pmap && pmap.comments && pmap.comments.length){
            writeComments({"0": pmap});
        }

    });

}

function replaceCodeMarkups(markdown){
    markdown = replaceAll(markdown, '\\[code\\]','```');
    markdown = replaceAll(markdown, '\\[code lang="xml"\\]','```xml');
    markdown = replaceAll(markdown, '\\[code lang="html"\\]','```html');
    markdown = replaceAll(markdown, '\\[code lang="javascript"\\]','```javascript');
    markdown = replaceAll(markdown, '\\[/code\\]','```');
    markdown = replaceAll(markdown, '\\[code lang="js"\\]','```javascript');
    markdown = replaceAll(markdown, '\\[code language="typescript"\\]','```typescript');
    markdown = replaceAll(markdown, '\\[code lang="csharp"\\]','```csharp');
    markdown = replaceAll(markdown, '\\[code lang="html"\\]','```html');
    
    // replace additional escaped characters 
    markdown = replaceAll(markdown, '\\[','[');
    markdown = replaceAll(markdown, '\\]',']');
    markdown = replaceAll(markdown, ' \\_',' _');
    

    return markdown;
}

    
// hack to change punctation level when spaces are not trailed
function replacePunctation(markdown){
    markdown = replaceAll(markdown, '	*', '*');
    markdown = replaceAll(markdown, '	1', '1');
    markdown = replaceAll(markdown, '	2', '2');
    markdown = replaceAll(markdown, '	3', '3');
    markdown = replaceAll(markdown, '	4', '4');

    return markdown;
}

function removeDomainHostNames(markdown){
    // images
    markdown = replaceAll(markdown, 'https://radekmaziarka.pl/wp-content/uploads/', '/images/')
    markdown = replaceAll(markdown, 'http://radblog.pl/wp-content/uploads/', '/images/')
    markdown = replaceAll(markdown, 'https://radblog.pl/wp-content/uploads/', '/images/')

    // address with language
    markdown = replaceAll(markdown, 'http://radblog.pl/en', '');
    markdown = replaceAll(markdown, 'http://radblog.pl/pl', '');

    // addresses without language
    markdown = replaceAll(markdown, 'https://radekmaziarka.pl', '');
    markdown = replaceAll(markdown, 'http://radblog.pl', '');
    markdown = replaceAll(markdown, 'https://radblog.pl', '');
    return markdown;
}

function fixImagesURL(str){
    if(!str) return '';
    str = str.replace(/-[0-9]+x[0-9]*/g,'');
    return str;
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'), replace);
};


function handlePagesXML(err, result) {
    if (err) {
        console.log(`Error parsing xml file (${backupXmlFile})\n${JSON.stringify(err)}`); 
        return 1;
    }

    var pages = [];
    
    // try {
        pages = result.rss.channel[0].item;
        
        console.log(`Total Post count: ${pages.length}`);

        pages = pages.filter(function(post){
            var status = '';
            if(post["wp:status"]){
                status = post["wp:status"].join(''); 
            }
            // console.log(post["wp:status"].join(''));
            return status != "private" && status != "inherit" 
        });

        console.log(`Pages count: ${pages.length}`);

        var title = '';
        var slug = '';
        var content = '';
        var published = '';
        var fname = '';
        var markdown = '';
        var fileContent = '';
        var fileHeader = '';
        var featuredImagePath = '';
        var language = '';
        
        pages.forEach(function(page){
            var postMap = {};

            title = page.title[0].trim();
            slug = page.link[0].trim().replace('https://radekmaziarka.pl','');
            
            title = title.replace(/'/g, "''");

            published = page.pubDate;
            fname = page["wp:post_name"][0] || page["wp:post_id"];
            markdown = '';
            
            featuredImagePath = '';
            var metaArray = page['wp:postmeta'] || [];
            var featuredThumbnailMeta = metaArray.filter(meta => {
                return meta['wp:meta_key'][0] === '_thumbnail_id';
            })[0];

            if(featuredThumbnailMeta){
                var featuredImageId = featuredThumbnailMeta['wp:meta_value'][0];
                var featuredImage = imagesById[featuredImageId];
                featuredImagePath = featuredImage.paths.blogPath;
            }

            var categories = page.category;

            categories.forEach(function (category){
                if(category.$.domain === 'language')
                    language = category.$.nicename;
            });


            var outputPagesDir = getOutputPagesDir(language);
            fname = outputPagesDir+'/'+fname+'.md';
            
            if (page["content:encoded"]){
                content = '<div>'+page["content:encoded"]+'</div>'; //to resolve error if plain text returned
                markdown = tds.turndown(content);
                markdown = replacePunctation(markdown);
                markdown = fixImagesURL(markdown);
                markdown = removeDomainHostNames(markdown);

                fileHeader = ''
                fileHeader += `---\ntitle: '${title}'\nslug: '${slug}'\ndate: ${published}\ndraft: false\n`;
                if(featuredImagePath)
                    fileHeader+= `featured_image: '${featuredImagePath}'\n`;
                fileHeader+='---\n';
                fileContent = `${fileHeader}\n${markdown}`;

                myMkdirSync(outputPagesDir);
                writeToFile(fname, fileContent);                
            }

        });

}

function writeComments(postMaps){

    for (var pmap in postMaps){
        var comments = postMaps[pmap].comments;
        console.log(`post id: ${pmap} has ${comments.length} comments`);

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
