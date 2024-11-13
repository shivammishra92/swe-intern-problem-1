import Command from '../models/command.model.js'

//controller to store the commands
export const storeCommand = async(req,res)=>{
    const {command} = req.body;

    if(!command){
        return res.status(400).json({message: "Command not found"});
    }

    //minimum length check to avoid empty commands and provide some data security
    const minLen = 3;
    const maxLen = 200;
    if(command.length < minLen){
        return res.status(400).json({message: `Command must be at least ${minLen} characters long to be successfully executed`});
    }
    else if (command.length > maxLen) {
        return res.status(400).json({ error: `Command must be less than ${maxLen} characters long` });
    }


    try {
        const newCommand = new Command({command});
        await newCommand.save();
        res.status(201).json({message:"Command saved successfully"});
    } catch (error) {
        res.status(500).json({error: "Internal server error"});
    }
};


//controller to get the commands
export const searchCommand = async(req, res)=>{
   const {keyword} = req.query;

   if(!keyword){
    return res.status(400).json({message: "Keyword required"});
   }

   try {
     const commands = await Command.find({
        command: {$regex: keyword, $options: 'i'},
     });

     res.status(200).json(commands);
   } catch (error) {
    res.status(500).json({error: "Internal server error"});
   }
};
