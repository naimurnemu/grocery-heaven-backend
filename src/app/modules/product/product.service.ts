
import httpStatus from "http-status";
import moment from "moment";
import { SortOrder } from 'mongoose';
import ApiError from "../../../errors/ApiError";
import { paginationHelper } from '../../../helpers/paginationHelper';
import { AuthUser, IGenericResponse, IPaginationOptions } from "../../interfaces/common";
import { productSearchableFields } from './product.constant';
import { IProduct, IProductsFilters } from "./product.interface";
import { Product } from "./product.model";
const postAProduct = async (product: IProduct, user: AuthUser): Promise<IProduct> => {
    // const { name } = product
    if (user?.role !== 'admin') {
        throw new ApiError(httpStatus.CONFLICT, 'Unauthorized User!')
    }
    const newProduct = new Product({ ...product, addedBy: user?.userId });
    await newProduct.save();

    const responseData: IProduct = {
        ...newProduct.toJSON()
    };

    return responseData;
}

const updateProductByID = async (product: IProduct, params: string): Promise<IProduct> => {
    const { productName, description, price, brand, discount, category } = product;
    const id = params
    await Product.updateOne({ _id: id }, { $set: { productName: productName, description: description, price: price, brand: brand, discount: discount, category: category } });

    const responseData: IProduct = {
        ...product
    };

    return responseData;
}
const getAllProducts = async (searchQuery: string): Promise<IProduct[]> => {
    let whereCondition = {};
    if (searchQuery) {
        const regexPattern = new RegExp(searchQuery, 'i');
        whereCondition = {
            $or: [
                { productName: regexPattern },
                { brand: regexPattern },
                { description: regexPattern },
                { type: regexPattern },
            ],
        }
    }

    const allProducts = await Product.find(whereCondition).populate('subcategory', 'category name shortDesc -_id');

    return allProducts;
}

const getProductByCategory = async (categoryID: string): Promise<IProduct[]> => {
    const products = await Product.find({
        status: "In Stock",
        category: { $all: [categoryID] },
    }).populate('subcategory', 'category name shortDesc -_id');

    return products

};

const getHotProduct = async (): Promise<IProduct[]> => {

    const hotproduct = await Product.find({
        status: "In Stock",
        createdAt: {
            $gte: moment().subtract(60, 'days').format()
            // $lt: new Date(2012, 7, 15)
        },
        discount: {
            $gte: 5
        }
    }).populate('subcategory', 'category name shortDesc -_id');

    return hotproduct
}
const getRelatedProduct = async (categoryID: string, pid: string): Promise<IProduct[]> => {

    const hotproduct = await Product.find({
        status: "In Stock",
        category: { $all: [categoryID] },
        _id: { $ne: pid }
    }).populate('subcategory', 'category name shortDesc -_id');

    return hotproduct
}
const deleteProduct = async (id: string): Promise<string> => {
    const product = await Product.findOneAndDelete({
        _id: id,
    });
    if (!product) {
        return "something went wrong"
    }
    else {
        return "Product Deleted"
    }
}

const getProductsById = async (id: string): Promise<IProduct> => {
    const product = await Product.findOne({
        _id: id,
    });
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Product not found!')
    }

    return product;
};

const getSearchProduct = async (filters: IProductsFilters, paginationOptions: IPaginationOptions): Promise<IGenericResponse<IProduct[]>> => {
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } =
        paginationHelper.calculatePagination(paginationOptions);

    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: productSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // Filters needs $and to fullfill all the conditions
    // if (Object.keys(filtersData).length) {
    //     // console.log(filtersData)
    //     if(Object.keys('price')) {
    //         andConditions.push({
    //             $and: Object.entries(filtersData).map(([field, value]) => ({
    //                 [field]: {
    //                     $gte: value
    //                 },
    //             })),
    //         });
    //     }
    //     else if(Object.keys('discount')) {
    //         andConditions.push({
    //             $and: Object.entries(filtersData).map(([field, value]) => ({
    //                 [field]: {
    //                     $gte: value
    //                 },
    //             })),
    //         });
    //     }
    //     else if(Object.keys('countInStock')) {
    //         andConditions.push({
    //             $and: Object.entries(filtersData).map(([field, value]) => ({
    //                 [field]: {
    //                     $gte: value
    //                 },
    //             })),
    //         });
    //     }
    //     else if(Object.keys('category')) {
    //         andConditions.push({
    //             $and: Object.entries(filtersData).map(([field, value]) => ({
    //                 [field]: {
    //                     $in: value
    //                 },
    //             })),
    //         });
    //     }
    //     else {
    //         andConditions.push({
    //             $and: Object.entries(filtersData).map(([field, value]) => ({
    //                 [field]: value,
    //             })),
    //         });
    //     }
    //     // andConditions.push({
    //     //     $and: Object.entries(filtersData).map(([field, value]) => ({
    //     //         [field]: value,
    //     //     })),
    //     // });
    // }
    if (Object.keys(filtersData).length) {
        // console.log(filtersData)

        Object.entries(filtersData).map(([field, value]) => {
            if (field == 'price' || field == 'discount' || field === 'countInStock') {
                andConditions.push({
                    $and: [{
                        [field]: {
                            $gte: Number(value)
                        },
                    }]
                })
            }
            else if (field == 'category') {
                andConditions.push({
                    category: { $in: value }
                });
            }
            else {
                andConditions.push({
                    $and: [{
                        [field]: value
                    }]
                })
            }
        })

    }






    // Dynamic  Sort needs  field to  do sorting
    const sortConditions: { [key: string]: SortOrder } = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    console.log(andConditions[0].$or[3])
    console.log(andConditions[1])
    // andConditions[1].$or?.map((item) => console.log(item))

    const whereConditions =
        andConditions.length > 0 ? { $and: andConditions } : {};
        console.log(JSON.stringify(whereConditions))
    const result = await Product.find(whereConditions)
        .populate('subcategory', 'category name shortDesc -_id')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await Product.countDocuments(whereConditions);

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
}
const getLatestProduct = async (): Promise<IProduct[]> => {

    const hotproduct = await Product.find({
        status: "In Stock",
    }).populate('subcategory', 'category name shortDesc -_id')
        .sort({ createdAt: -1 })
        .limit(20)

    return hotproduct
}
export const ProductService = {
    postAProduct,
    getAllProducts,
    getProductByCategory,
    updateProductByID,
    getHotProduct,
    getRelatedProduct,
    deleteProduct,
    getProductsById,
    getSearchProduct,
    getLatestProduct
}

